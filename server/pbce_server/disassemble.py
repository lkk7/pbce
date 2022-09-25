import asyncio
from dis import Instruction
from pickle import loads
from typing import cast

from pbce_server.models import InstructionDict

from .pyversions import versions_paths


async def send_disassemble_task(
    version: str, code: str
) -> list[InstructionDict] | Exception:
    cmd = (
        f"{versions_paths[version]} -c "
        "'import sys;"
        "from base64 import b64decode;"
        "from dis import get_instructions;"
        "import pickle;"
        f'code=b64decode("{code}").decode("utf-8")\n'
        "try:\n"
        "  sys.stdout.buffer.write(pickle.dumps(list(get_instructions(code)),"
        "    protocol=3))\n"
        "except Exception as e:\n"
        "  sys.stdout.buffer.write(pickle.dumps(e))'"
    )
    proc = await asyncio.create_subprocess_shell(
        cmd,
        asyncio.subprocess.PIPE,
        asyncio.subprocess.PIPE,
    )
    disassembled_code = cast(
        list[Instruction] | Exception, loads((await proc.communicate())[0])
    )
    if isinstance(disassembled_code, Exception):
        return disassembled_code
    return [
        InstructionDict(
            opcode=instruction.opcode,
            opname=instruction.opname,
            arg=instruction.arg,
            argval=instruction.argval,
            argrepr=instruction.argrepr,
            offset=instruction.offset,
            starts_line=instruction.starts_line,
            is_jump_target=instruction.is_jump_target,
        )
        for instruction in disassembled_code
    ]
