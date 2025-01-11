export function cstrlen(wasm, ptr) {
    const memory = new Uint8Array(wasm.instance.exports.memory.buffer);
    let len = 0;
    while (memory[ptr] !== 0) {
        len++;
        ptr++;
    }
    return len;
}

export function cstrFromPtr(wasm, ptr) {
    const mem = new Uint8Array(wasm.instance.exports.memory.buffer);
    const len = cstrlen(wasm, ptr);
    const bytes = new Uint8Array(wasm.instance.exports.memory.buffer, ptr, len);
    return new TextDecoder().decode(bytes);
}
