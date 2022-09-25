import json
from typing import Type

from pbce_server.models import DissasembleRequest
from pydantic import BaseModel, ValidationError
from starlette.requests import Request
from starlette.responses import PlainTextResponse


async def get_validated_request(
    request: Request, request_class: Type[BaseModel]
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
            "Incorrect request syntax/body, ensure that it conforms to the schema: "
            f"{request_class.schema_json()}",
            status_code=400,
        )
    return valid_request
