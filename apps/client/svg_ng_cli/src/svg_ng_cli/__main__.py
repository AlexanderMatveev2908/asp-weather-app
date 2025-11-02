from pathlib import Path
import argparse

from svg_ng_cli.lib.setup_parser import setup_parser
from svg_ng_cli.lib.err_mng import err
from svg_ng_cli.lib.templates import gen_template_html, gen_template_ts
from svg_ng_cli.lib.name_parse import get_svg_prefix, to_kebab, to_pascal
from svg_ng_cli.lib.svg_type import SvgT


def mng() -> None:
    parser = setup_parser()
    args = parser.parse_args()

    svg: Path = args.input
    output_dir: Path = args.output
    svg_type: SvgT = SvgT.from_input(args.type)

    prefix = svg.stem
    kebab_name: str = to_kebab(prefix)
    class_name = get_svg_prefix(svg_type) + to_pascal(kebab_name)

    try:
        svg_data = svg.read_text(encoding="utf-8")
    except FileNotFoundError:
        err(f"❌ file not found {svg}")
        return

    output_dir.mkdir(parents=True, exist_ok=True)
    helper_read_nested = output_dir / "_"
    helper_read_nested.mkdir(parents=True, exist_ok=True)
    out_component_dir: Path = output_dir / prefix
    out_component_dir.mkdir(parents=True, exist_ok=True)

    out_file_html = out_component_dir / f"{kebab_name}.html"
    out_file_ts = out_component_dir / f"{kebab_name}.ts"

    if out_component_dir.exists():
        print(f"🧹 deleting existing {class_name}")
        for f in [out_file_ts, out_file_html]:
            try:
                f.unlink()
            except FileNotFoundError:
                pass

    out_file_html.write_text(gen_template_html(svg_data, svg_type), encoding="utf-8")
    out_file_ts.write_text(
        gen_template_ts(kebab_name, class_name, svg_type), encoding="utf-8"
    )

    print(f"🛠️ generated component {class_name}")


if __name__ == "__main__":
    mng()
