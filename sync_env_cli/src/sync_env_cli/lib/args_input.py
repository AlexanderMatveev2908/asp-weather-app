from argparse import ArgumentParser, Namespace

from sync_env_cli.lib.env_modes import EnvMode

EMJ: dict[EnvMode, str] = {
    EnvMode.D: "🛠️",
    EnvMode.T: "🧪",
    EnvMode.P: "🏛️",
}


def setup_parser() -> EnvMode:
    parser = ArgumentParser(description="🔐 sync env across monorepo")

    parser.add_argument(
        "mode",
        choices=[
            "d",
            "t",
            "p",
        ],
        help="ENV mode (short form => d | t | p)",
    )

    args: Namespace = parser.parse_args()

    mode: EnvMode = EnvMode.from_input(args.mode)

    return mode
