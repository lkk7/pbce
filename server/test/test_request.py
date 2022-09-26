from json import JSONDecodeError
from typing import Any

from pbce_server.models import DissasembleRequest
from pbce_server.request import get_validated_request
import pytest
from starlette.requests import Request
from starlette.responses import PlainTextResponse


pytestmark = pytest.mark.asyncio


def get_mock_request(json_return: Exception | dict[str, Any]) -> Request:
    class MockRequest(Request):
        def __init__(self) -> None:
            pass

        async def json(self) -> dict[str, Any]:
            if isinstance(json_return, Exception):
                raise json_return
            return json_return

    return MockRequest()


class TestGetValidatedRequest:
    @pytest.mark.parametrize(
        "error_type",
        [JSONDecodeError, ValueError, TypeError],
    )
    async def test_result_on_error(self, error_type: Exception) -> None:
        result = await get_validated_request(
            get_mock_request(error_type), DissasembleRequest
        )
        assert isinstance(result, PlainTextResponse)
        assert result.status_code == 400

    async def test_result_validation_error(self) -> None:
        result = await get_validated_request(
            get_mock_request({"wrong": "schema"}), DissasembleRequest
        )
        assert isinstance(result, PlainTextResponse)
        assert result.status_code == 400

    async def test_correct_result(self) -> None:
        result = await get_validated_request(
            get_mock_request({"code": 'print("hello")', "versions": ["all"]}),
            DissasembleRequest,
        )
        assert isinstance(result, DissasembleRequest)
        assert result.code == 'print("hello")'
        assert result.versions == ["all"]
