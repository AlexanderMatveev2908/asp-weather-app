ngsvg(){
  local curr=$(basename $PWD)

  (
    if [[ $curr != "client" ]]; then
      cd apps/client || { echo "❌ dir not found"; return 1; }
    fi

    cd svg_ng_cli

    poetry run python -m svg_ng_cli "$@"
    )
}

ngcv() {
  if [[ $(basename "$PWD") == "client" ]]; then
    local base_dir="$PWD"
  else
    local base_dir="$(pwd)/apps/client"
  fi

  local assets_dir="$base_dir/src/assets/svgs"
  local output_base="$base_dir/src/common/components/svgs"

  (
    cd "$base_dir/svg_ng_cli" || { echo "❌ svg_ng_cli not found"; return 1; }

    setopt NULL_GLOB  

    for type in fill stroke advanced; do
      local input_dir="$assets_dir/$type"
      local output_dir="$output_base/$type"

      [[ -d "$input_dir" ]] || {
        echo "⚠️ skipping missing folder => $input_dir"
        continue
      }

      echo "🔍 scanning SVGs type $type"

      mkdir -p "$output_dir"

      local type_flag
      if [[ "$type" == "fill" ]]; then
        type_flag="f"
      elif [[ "$type" == "stroke" ]]; then
        type_flag="s"
      elif [[ "$type" == "advanced" ]]; then
        type_flag="a"
      fi

      for svg_file in "$input_dir"/*.svg; do
        local name=$(basename "$svg_file")

        echo "⏳ parsing $name"

        poetry run python -m svg_ng_cli "$svg_file" "$output_dir" "$type_flag" || {
          echo "❌ failed to convert => $name"
          continue
        }
      done
    done

    echo "🎉 SVGs parsed 🎉"
  )
}