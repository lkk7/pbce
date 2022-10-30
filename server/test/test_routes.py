from httpx import AsyncClient
from pbce_server.main import app
from pbce_server.models import DisassembleRequest
from pbce_server.pyversions import versions_paths
import pytest
from starlette.responses import PlainTextResponse

pytestmark = pytest.mark.asyncio
imports = {
    "get_val_req": "pbce_server.routes.get_validated_request",
    "send_dis_task": "pbce_server.routes.send_disassemble_task",
}


async def get_err_response(*args: object, **kwargs: object) -> PlainTextResponse:
    return PlainTextResponse("ERROR")


async def get_bad_versions(*args: object, **kwargs: object) -> DisassembleRequest:
    return DisassembleRequest(code="print(1)", versions=["1.2.3", "wrong", "versions"])


async def get_correct_versions(*args: object, **kwargs: object) -> DisassembleRequest:
    return DisassembleRequest(code="print(1)", versions=["3.7.0", "3.8.0"])


async def mock_send_disassemble_task(version: str, _: str) -> str | Exception:
    return "mockedResponse" if version == "3.7.0" else SyntaxError("TestError!")


class TestVersionsRoute:
    async def test_versions_response(self) -> None:
        async with AsyncClient(app=app, base_url="http://testserver") as client:
            response = await client.get("/versions")
            assert response.status_code == 200
            assert response.json() == list(versions_paths)


class TestDisassembleRoute:
    async def test_invalid_request(self, monkeypatch: pytest.MonkeyPatch) -> None:
        async with AsyncClient(app=app, base_url="http://testserver") as client:
            monkeypatch.setattr(imports["get_val_req"], get_err_response)
            response = await client.post("/disassemble")
            assert response.content == b"ERROR"

    async def test_bad_versions_request(self, monkeypatch: pytest.MonkeyPatch) -> None:
        async with AsyncClient(app=app, base_url="http://testserver") as client:
            monkeypatch.setattr(imports["get_val_req"], get_bad_versions)
            response = await client.post("/disassemble")
            assert response.status_code == 400
            assert (
                response.content == b"specified version(s):"
                b" ['1.2.3', 'wrong', 'versions'] not available"
            )

    async def test_versions_request(self, monkeypatch: pytest.MonkeyPatch) -> None:
        async with AsyncClient(app=app, base_url="http://testserver") as client:
            monkeypatch.setattr(imports["get_val_req"], get_correct_versions)
            monkeypatch.setattr(imports["send_dis_task"], mock_send_disassemble_task)
            response = await client.post("/disassemble")
            assert response.status_code == 200
            assert response.json() == {
                "3.7.0": "mockedResponse",
                "3.8.0": "TestError!",
            }
