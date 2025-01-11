#!/bin/bash
set -x -e

# Reference: https://github.com/hyouteki/cwasmjstmpl/blob/master/build.sh

MODULE_NAME="module"
WARNS=("all" "extra" "switch-enum")
INCLUDE_DIRS=("./")
EXPORT_SYMBOLS=("test")

PORT=8000

clang -Os -fno-builtin ${WARNS[@]/#/"-W"} --target=wasm32 \
	  --no-standard-libraries ${EXPORT_SYMBOLS[@]/#/"-Wl,--export="} \
	  -Wl,--no-entry -Wl,--allow-undefined ${INCLUDE_DIRS[@]/#/"-I"} \
	  -o ${MODULE_NAME}.wasm ${MODULE_NAME}.c

wasm2wat ${MODULE_NAME}.wasm > ${MODULE_NAME}.wat

kill -9 $(lsof -t -i:$PORT) || true
python3 -m http.server $PORT &
SERVER_PID=$!

function cleanup() {
	kill -9 $SERVER_PID
	wait $SERVER_PID 2>/dev/null
	kill -9 $(lsof -t -i:$PORT) || true
}
trap cleanup EXIT

open localhost:$PORT
wait
