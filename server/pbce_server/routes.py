import json

from pydantic import BaseModel, ValidationError
from starlette.endpoints import HTTPEndpoint
from starlette.requests import Request
from starlette.responses import JSONResponse, PlainTextResponse


from .models import DissasembleRequest
from .pyversions import available_versions


class Versions(HTTPEndpoint):
    async def get(self, _: Request) -> JSONResponse:
        return JSONResponse(available_versions)


async def get_validated_request(
    request: Request, request_class: BaseModel
) -> DissasembleRequest | PlainTextResponse:
    try:
        body = await request.json()
        valid_request = DissasembleRequest(**body)
    except ValidationError as e:
        errors = ", ".join((str(err) for err in e.errors()))
        return PlainTextResponse(
            f"errors in JSON body: {errors}",
            status_code=400,
        )
    except (json.JSONDecodeError, ValueError, TypeError):
        return PlainTextResponse(
            "Incorrect request body, ensure that it has this schema: "
            f"{request_class.schema_json()}",
            status_code=400,
        )
    return valid_request


class Disassemble(HTTPEndpoint):
    async def get(self, request: Request) -> JSONResponse | PlainTextResponse:
        valid_request = await get_validated_request(request, DissasembleRequest)
        if isinstance(valid_request, PlainTextResponse):
            return valid_request
        try:
            if valid_request.versions == ["all"] or len(valid_request.versions) == 0:
                pass  # all versions
            else:
                pass  # given versions
            # pyversions_path = os.getenv("PYVERSIONS_PATH")
        except SyntaxError as e:
            return PlainTextResponse(
                f"Syntax error ({e.lineno}:{e.offset}, {e.msg})"
                "Check that the code is correct and is legal in this Python version",
                status_code=400,
            )
        return JSONResponse(valid_request.dict())
