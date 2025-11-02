import sys
from typing import NoReturn


def err(msg: str) -> NoReturn:
    print(f"❌ {msg}")
    sys.exit(1)
