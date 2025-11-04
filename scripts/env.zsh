ue(){
  local curr="$1"

   if [[ ! "$curr" =~ ^(d|t|p)$ ]]; then
    echo "❌ invalid mode"
    return 1
  fi

  local repo;

  if ! repo=$(git rev-parse --show-toplevel 2>/dev/null); then
    echo "❌ You are not inside a Git repo"
    return 1
  fi

  (
    cd "${repo}/sync_env_cli" || {
    echo "❌ python cli not found"
    return 1
    }

    poetry run python -m sync_env_cli "$1"
  )
}