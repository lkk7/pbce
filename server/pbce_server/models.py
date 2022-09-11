from pydantic import BaseModel, validator


class DissasembleRequest(BaseModel):
    code: str
    versions: list[str] = ["all"]

    @validator("versions")
    def versions_non_empty(cls, val: list[str]) -> list[str]:
        if len(val) == 0:
            raise ValueError("must not be empty")
        return val
