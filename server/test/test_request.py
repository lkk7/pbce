from json import JSONDecodeError

from pbce_server.models import DissasembleRequest
from pbce_server.request import get_validated_request
from pydantic import ValidationError
import pytest
from starlette.requests import Request
from starlette.responses import PlainTextResponse


pytestmark = pytest.mark.asyncio


def get_mock_err_request(e: Exception):
    class MockErrRequest(Request):
        def __init__(self) -> None:
            pass

        def json(self) -> None:
            raise e

    return MockErrRequest()


@pytest.mark.parametrize(
    "error_type",
    [ValidationError, JSONDecodeError, ValueError, TypeError],
)
async def test_bad_get_validated_request(error_type: Exception) -> None:
    result = await get_validated_request(
        get_mock_err_request(error_type), DissasembleRequest
    )
    assert isinstance(result, PlainTextResponse)


# async def test_good_get_validated_request() -> None:
#     result = await get_validated_request(
#         get_mock_err_request(error_type), DissasembleRequest
#     )
#     assert isinstance(result, PlainTextResponse)
