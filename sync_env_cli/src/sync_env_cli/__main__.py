from pathlib import Path

from sync_env_cli.lib.backups import gen_backups
from sync_env_cli.lib.env_modes import EnvMode
from sync_env_cli.lib.repo_files import CtxPaths, ensure_repo_shape, get_existing_vars
from sync_env_cli.lib.args_input import EMJ, setup_parser
from sync_env_cli.lib.update_env import patch_env, patch_git, patch_kind


def main() -> None:
    cwd: Path = Path.cwd()
    repo_root = (cwd / "../").resolve()
    ctx: CtxPaths = ensure_repo_shape(repo_root)

    gen_backups(ctx)

    mode: EnvMode = setup_parser()
    existing_vars: list[str] = get_existing_vars(ctx.root_env)

    new_dev_work: list[str] = patch_env(existing_vars, mode)
    new_kind: list[str] = patch_env(existing_vars, EnvMode.D, exclude=["LINUX_PWD"])
    new_git_pipe: list[str] = patch_env(existing_vars, EnvMode.T, exclude=["LINUX_PWD"])

    base_flow_sync = [ctx.root_env, ctx.client_env, ctx.server_env]
    for f in base_flow_sync:
        f.write_text("\n".join(new_dev_work))

    patch_git(ctx.git_pipeline, new_git_pipe)

    patch_kind(ctx.kind_secrets, new_kind)

    print(f"🔐 update env var using {mode.long_value().upper()} mode {EMJ[mode]}")


if __name__ == "__main__":
    main()
