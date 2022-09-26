import asyncio
from dis import Instruction
import typing

from pbce_server.disassemble import send_disassemble_task
from pbce_server.models import InstructionDict
import pytest

pytestmark = pytest.mark.asyncio

SendDisassembleTaskRetType = list[InstructionDict] | Exception
SendDisassembleTaskType = typing.Coroutine[
    typing.Any, typing.Any, SendDisassembleTaskRetType
]


class MockSubprocess:
    async def communicate(self) -> list[str]:
        return ["stdin", "stderr"]


async def get_mock_subprocess(*args: object, **kwargs: object) -> MockSubprocess:
    return MockSubprocess()


def get_mock_pickle_loads(
    return_val: list[Instruction] | Exception,
) -> typing.Callable[..., list[Instruction] | Exception]:
    def mock_pickle_loads(
        *args: object, **kwargs: object
    ) -> list[Instruction] | Exception:
        return return_val

    return mock_pickle_loads


@pytest.fixture
def patched_send_disassemble_task(
    monkeypatch: pytest.MonkeyPatch,
) -> typing.Callable[[SendDisassembleTaskRetType], SendDisassembleTaskType]:
    def wrapper(
        return_val: SendDisassembleTaskRetType,
    ) -> SendDisassembleTaskType:
        monkeypatch.setattr(asyncio, "create_subprocess_shell", get_mock_subprocess)
        monkeypatch.setattr(
            "pbce_server.disassemble.loads",
            get_mock_pickle_loads(return_val),
        )
        return send_disassemble_task

    return wrapper


class TestSendDisassembleTask:
    async def test_instruction_response(
        self,
        patched_send_disassemble_task: SendDisassembleTaskType,
    ) -> None:
        result = await patched_send_disassemble_task(
            [
                Instruction(
                    opname="TESTNAME",
                    opcode=123,
                    arg=None,
                    argval=None,
                    argrepr="",
                    offset=1,
                    starts_line=1,
                    is_jump_target=False,
                )
            ]
        )("3.10.0", "print(1)")
        assert isinstance(result, list)
        assert isinstance(result[0], dict)
        assert result[0]["opname"] == "TESTNAME"

    async def test_exception_response(
        self,
        patched_send_disassemble_task: SendDisassembleTaskType,
    ) -> None:
        result = await patched_send_disassemble_task(SyntaxError("Error!"))(
            "3.10.0", "print(1)"
        )
        assert isinstance(result, SyntaxError)
        assert result.msg == "Error!"
