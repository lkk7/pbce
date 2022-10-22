import asyncio
from pickle import loads
import typing

from pbce_server.models import InstructionDict

from .pyversions import versions_paths


def get_disassemble_command(version: str, code: str) -> str:
    return f"""{versions_paths[version]} -c '
import sys;
from base64 import b64decode;
from dis import get_instructions;
from pickle import dumps;
code=b64decode("{code}").decode("utf-8")
try:
    instructions = [
        {{field: (val if field else None) for field, val in zip(instr._fields, instr)}}
        for instr in get_instructions(code)
    ]
    sys.stdout.buffer.write(dumps(instructions, protocol=3))
except Exception as e:
    sys.stdout.buffer.write(dumps(e))'
"""


async def send_disassemble_task(
    version: str, code: str
) -> list[InstructionDict] | Exception:
    proc = await asyncio.create_subprocess_shell(
        get_disassemble_command(version, code),
        asyncio.subprocess.PIPE,
        asyncio.subprocess.PIPE,
    )
    disassembled_code = typing.cast(
        list[InstructionDict] | Exception, loads((await proc.communicate())[0])
    )
    return disassembled_code
