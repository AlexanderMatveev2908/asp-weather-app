from svg_ng_cli.lib.svg_type import SvgT


def to_kebab(arg: str) -> str:
    return arg.replace("_", "-")


def to_pascal(arg: str) -> str:
    return arg.replace("-", " ").replace("_", " ").title().replace(" ", "")


def get_svg_prefix(svg_type: SvgT) -> str:
    if svg_type == SvgT.F:
        return "SvgFill"
    elif svg_type == SvgT.S:
        return "SvgStroke"
    else:
        return "SvgAdv"
