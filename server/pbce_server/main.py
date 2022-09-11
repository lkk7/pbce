from starlette.applications import Starlette
from starlette.routing import Route

from .routes import Disassemble, Versions

app = Starlette(
    routes=[
        Route("/versions", Versions),
        Route("/disassemble", Disassemble),
    ],
)
