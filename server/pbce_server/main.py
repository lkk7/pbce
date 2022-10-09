from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.routing import Route


from .routes import Disassemble, Versions

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["GET", "POST", "OPTIONS"],
    )
]

app = Starlette(
    routes=[
        Route("/versions", Versions),
        Route("/disassemble", Disassemble),
    ],
    middleware=middleware,
)
