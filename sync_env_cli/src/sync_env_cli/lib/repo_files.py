from dataclasses import dataclass
from pathlib import Path

from sync_env_cli.lib.errors import err


@dataclass
class CtxPaths:
    repo_root: Path
    root_env: Path
    client_env: Path
    server_env: Path
    git_pipeline: Path
    kind_secrets: Path


def ensure_repo_shape(repo_root: Path) -> CtxPaths:
    client: Path = repo_root / "apps/client"
    server: Path = repo_root / "apps/server"
    # ? update based on your needs
    git_pipeline: Path = repo_root / ".github/workflows/check_deploy.yml"
    kind_secrets: Path = repo_root / "kind-secrets.yml"
    root_env: Path = repo_root / ".env"

    if not root_env.is_file():
        err("root env file not present")
    if not client.is_dir():
        err("client dir not present")
    if not server.is_dir():
        err("server dir not present")
    if not git_pipeline.is_file():
        err("git CI/CD pipeline file not present")
    if not kind_secrets.is_file():
        err("kind secrets file not present")

    client_env: Path = client / ".env"
    server_env: Path = server / ".env"

    return CtxPaths(
        repo_root, root_env, client_env, server_env, git_pipeline, kind_secrets
    )


def get_existing_vars(root_env: Path) -> list[str]:
    content: str = root_env.read_text()
    arr: list[str] = content.split("\n")

    return arr
