from pydantic import BaseModel, validator


class DissasembleRequest(BaseModel):
    code: str
    versions: list[str] = ["all"]

    @validator("versions")
    def versions_non_empty(cls, v: list[str]) -> list[str]:
        if len(v) == 0:
            raise ValueError("must not be empty")
        return v
