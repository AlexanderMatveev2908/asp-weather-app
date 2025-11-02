import argparse
from pathlib import Path


def setup_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="svg_ng_cli",
        description="🐍 convert SVG files into Angular components.",
    )

    parser.add_argument("input", type=Path, help="path to the input SVG file")

    parser.add_argument(
        "output",
        type=Path,
        help="directory where the Angular component will be generated",
    )

    parser.add_argument(
        "type",
        nargs="?",
        choices=["f", "s", "a"],
        default="f",
        help="(optional) Type of SVG: 'f' for filled, 's' for stroke-only, 'a' for advanced pre-styled [default: f]",
    )

    return parser
