import asyncio

from pbce_server.disassemble import send_disassemble_task
from pbce_server.models import DisassembleRequest
from pbce_server.pyversions import versions_paths
from pbce_server.request import get_validated_request
from starlette.endpoints import HTTPEndpoint
from starlette.requests import Request
from starlette.responses import JSONResponse, PlainTextResponse


class Versions(HTTPEndpoint):
    async def get(self, _: Request) -> JSONResponse:
        return JSONResponse(list(versions_paths))


class Disassemble(HTTPEndpoint):
    async def post(self, request: Request) -> JSONResponse | PlainTextResponse:
        valid_request = await get_validated_request(request, DisassembleRequest)
        if isinstance(valid_request, PlainTextResponse):
            return valid_request

        # Get Python versions in which to disassemble the code
        versions = valid_request.versions
        if versions == ["all"] or len(versions) == 0:
            versions = list(versions_paths)
        else:
            bad_versions = list(filter(lambda v: v not in versions_paths, versions))
            if len(bad_versions) > 0:
                return PlainTextResponse(
                    f"specified version(s): {bad_versions} not available",
                    status_code=400,
                )

        # Disassemble the code by async tasks, for all specified versions
        disassembled: list[str | Exception] = await asyncio.gather(
            *(send_disassemble_task(v, valid_request.code) for v in versions)
        )
        return JSONResponse(
            {
                versions[i]: str(d) if isinstance(d, Exception) else d
                for i, d in enumerate(disassembled)
            }
        )
