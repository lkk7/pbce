import dis
import json
import os

from pydantic import ValidationError
from starlette.applications import Starlette
from starlette.endpoints import HTTPEndpoint
from starlette.requests import Request
from starlette.responses import JSONResponse, PlainTextResponse
from starlette.routing import Route

from .models import DissasembleRequest
from .pyversions import available_versions


class Versions(HTTPEndpoint):
    async def get(self, _: Request) -> JSONResponse:
        return JSONResponse(available_versions)


class Disassemble(HTTPEndpoint):
    async def get(self, request: Request) -> JSONResponse | PlainTextResponse:
        try:
            body = await request.json()
            valid_request = DissasembleRequest(**body)
        except (json.JSONDecodeError, ValidationError, TypeError) as e:
            print(e)
            return PlainTextResponse(
                "Incorrect request body, ensure that the JSON is correct: "
                '{"code": (string), "versions": (array)}"',
                status_code=400
            )
        return JSONResponse(valid_request.dict())


app = Starlette(
    routes=[
        Route("/versions", Versions),
        Route("/disassemble", Disassemble),
    ],
)
