import asyncio
import typing

from pbce_server.disassemble import send_disassemble_task
import pytest

pytestmark = pytest.mark.asyncio

SendDisTaskRetType = str | Exception
SendDisTaskCoroutineType = typing.Coroutine[typing.Any, typing.Any, SendDisTaskRetType]
SendDisTaskType = typing.Callable[[str, str], SendDisTaskCoroutineType]
GetPatchedSendDisTaskType = typing.Callable[
    [SendDisTaskRetType],
    SendDisTaskType,
]


@pytest.fixture
def get_patched_send_func(
    monkeypatch: pytest.MonkeyPatch,
) -> GetPatchedSendDisTaskType:
    class MockSubprocess:
        async def communicate(self) -> list[str]:
            return ["stdin", "stderr"]

    async def get_mock_subprocess(*args: object, **kwargs: object) -> MockSubprocess:
        return MockSubprocess()

    def get_mock_pickle_loads(
        return_val: str | Exception,
    ) -> typing.Callable[..., SendDisTaskRetType]:
        def mock_pickle_loads(*args: object, **kwargs: object) -> str | Exception:
            return return_val

        return mock_pickle_loads

    def wrapper(
        return_val: SendDisTaskRetType,
    ) -> typing.Callable[[str, str], SendDisTaskCoroutineType]:
        monkeypatch.setattr(asyncio, "create_subprocess_shell", get_mock_subprocess)
        monkeypatch.setattr(
            "pbce_server.disassemble.loads",
            get_mock_pickle_loads(return_val),
        )
        return send_disassemble_task

    return wrapper


class TestSendDisassembleTask:
    async def test_instruction_response(
        self, get_patched_send_func: GetPatchedSendDisTaskType
    ) -> None:
        result = await get_patched_send_func("mockedResult")("3.10.0", "print(1)")
        assert result == "mockedResult"

    async def test_exception_response(
        self,
        get_patched_send_func: GetPatchedSendDisTaskType,
    ) -> None:
        result = await get_patched_send_func(SyntaxError("Error!"))(
            "3.10.0", "print(1)"
        )
        assert isinstance(result, SyntaxError)
        assert result.msg == "Error!"
