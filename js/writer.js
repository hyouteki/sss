class Writer {
    constructor(memory) {
        this.memory = memory;
        this.ptr = 0;
    }
    reserve(size) {
        const ret = this.ptr;
        this.ptr += size;
        return ret;
    }
}

export default Writer;
