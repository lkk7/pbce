import asyncio
from pickle import loads, UnpicklingError
import typing

from .pyversions import versions_paths


def get_disassemble_command(version: str, code: str) -> str:
    return f"""{versions_paths[version]} -c '
import sys;
from base64 import b64decode;
from dis import dis;
from pickle import dumps;
code=b64decode("{code}").decode("utf-8")
try:
    dis(code)
except Exception as e:
    sys.stdout.buffer.write(dumps(e))'
"""


async def send_disassemble_task(version: str, code: str) -> str | Exception:
    proc = await asyncio.create_subprocess_shell(
        get_disassemble_command(version, code),
        asyncio.subprocess.PIPE,
        asyncio.subprocess.PIPE,
    )
    stdout = (await proc.communicate())[0]
    try:
        disassembled_code = typing.cast(
            str | Exception, loads(stdout)
        )
    except UnpicklingError:
        disassembled_code = stdout.decode("utf-8")
    return disassembled_code
