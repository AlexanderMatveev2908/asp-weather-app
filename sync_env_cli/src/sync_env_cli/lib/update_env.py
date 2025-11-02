from pathlib import Path
from re import Match, Pattern
import re
from sync_env_cli.lib.env_modes import EnvMode


def patch_env(
    existing: list[str], mode_to: EnvMode, exclude: list[str] | None = None
) -> list[str]:
    updated: list[str] = []

    for p in existing:
        trimmed: str = p.strip()
        if len(trimmed) and not trimmed.startswith("#"):
            pair: list[str] = trimmed.split("=", 1)
            if len(pair) != 2:
                continue

            key, val = pair
            if key == "ENV_MODE":
                updated.append(f"ENV_MODE={mode_to.long_value()}")
            else:
                if key in (exclude or []):
                    continue
                updated.append(f"{key}={val}")

    updated.append("\n")

    return updated


def patch_git(git_pipeline: Path, new_env: list[str]) -> None:
    content: str = git_pipeline.read_text()

    pattern: Pattern = re.compile(r"(env:\s*?)(.*?)(?=\n\s*steps:\n\s*\-)", re.DOTALL)

    formatted: list[str] = []
    for s in new_env:
        k, *_ = s.split("=", 1)

        if not s.strip():
            continue

        value = '"test"' if k == "ENV_MODE" else f"${{{{secrets.{k}}}}}"

        formatted.append(f"{' ' *6}{k}: {value}")
    joined: str = "\n".join(formatted)

    new_content: str = pattern.sub(rf"\1\n{joined}", content)

    git_pipeline.write_text(new_content)


def patch_kind(kind_secrets: Path, new_env: list[str]) -> None:
    content: str = kind_secrets.read_text()

    formatted: list[str] = []

    for s in new_env:
        if not s.strip():
            continue
        k, v = s.split("=", 1)
        formatted.append(f'{" "*2}{k}: "{v}"')

    joined: str = "\n".join(formatted)

    pattern = re.compile(r"(stringData:\s*?)(.*?)(?=\n\S|\Z)", re.DOTALL)
    new_content: str = pattern.sub(rf"\1\n{joined}", content)

    kind_secrets.write_text(new_content)
