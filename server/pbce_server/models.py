from pydantic import BaseModel


class DisassembleRequest(BaseModel):
    code: str
    versions: list[str] = ["all"]
