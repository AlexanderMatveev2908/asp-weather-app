from pathlib import Path
from sync_env_cli.lib.repo_files import CtxPaths


def gen_backups(ctx: CtxPaths) -> None:

    for p in [ctx.root_env, ctx.kind_secrets, ctx.git_pipeline]:
        content: str = p.read_text()
        bkp: Path = p.with_suffix(p.suffix + ".bkp")
        bkp.write_text(content)
