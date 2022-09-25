from typing import Any, TypedDict

from pydantic import BaseModel


class DissasembleRequest(BaseModel):
    code: str
    versions: list[str] = ["all"]


class InstructionDict(TypedDict):
    opcode: int
    opname: str
    arg: int | None
    argval: Any
    argrepr: str
    offset: int
    starts_line: int | None
    is_jump_target: bool
