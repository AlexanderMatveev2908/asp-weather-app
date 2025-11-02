from enum import Enum

from sync_env_cli.lib.errors import err


class EnvMode(Enum):
    D = "d"
    T = "t"
    P = "p"

    @classmethod
    def from_input(cls, arg) -> "EnvMode":
        for member in cls:
            if member.value == arg:
                return member

        err("invalid value")

    def long_value(self) -> str:
        map = {
            EnvMode.D: "development",
            EnvMode.T: "test",
            EnvMode.P: "production",
        }

        return map[self]
