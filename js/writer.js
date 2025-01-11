class Writer {
    constructor(memory) {
        this.memory;
        this.ptr = 0;
    }
    reserve(size) {
        const ret = this.ptr;
        this.ptr += size;
        return ret;
    }
    get_memory() {
        return this.memory;
    }
}

export default Writer;
