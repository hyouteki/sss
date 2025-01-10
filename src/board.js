class Board {
    static SIZE = 8 * 12; // sizeof(uint64_t) * 12 BitBoards
    constructor(writer, boardSize) {
        // Initialize the memory buffer and data view for the board
        this.boardBuffer = new Uint8Array(writer.memory.buffer, writer.reserve(SIZEOF_BOARD), SIZEOF_BOARD);
        this.boardView = new DataView(this.boardBuffer.buffer);
    }

    // Method to set a 64-bit BigInt value at a specific byte offset
    setBigUint64(offset, value) {
        this.boardView.setBigUint64(offset, value, true); // little-endian by default
    }

    // Getter/Setter for Pawn BitBoards
    set wp_bb(value) { this.setBigUint64(0, value); }
    get wp_bb() { return this.boardView.getBigUint64(0, true); }
    set bp_bb(value) { this.setBigUint64(8, value); }
    get bp_bb() { return this.boardView.getBigUint64(8, true); }
    // Getter/Setter for Knight BitBoards    
    set wn_bb(value) { this.setBigUint64(16, value); }
    get wn_bb() { return this.boardView.getBigUint64(16, true); }
    set bn_bb(value) { this.setBigUint64(24, value); }
    get bn_bb() { return this.boardView.getBigUint64(24, true); }
    // Getter/Setter for Bishop BitBoards
    set wb_bb(value) { this.setBigUint64(32, value); }
    get wb_bb() { return this.boardView.getBigUint64(32, true); }
    set bb_bb(value) { this.setBigUint64(40, value); }
    get bb_bb() { return this.boardView.getBigUint64(40, true); }
    // Getter/Setter for Rook BitBoards
    set wr_bb(value) { this.setBigUint64(48, value); }
    get wr_bb() { return this.boardView.getBigUint64(48, true); }
    set br_bb(value) { this.setBigUint64(56, value); }
    get br_bb() { return this.boardView.getBigUint64(56, true); }
    // Getter/Setter for Queen BitBoards
    set wq_bb(value) { this.setBigUint64(64, value); }
    get wq_bb() { return this.boardView.getBigUint64(64, true); }
    set bq_bb(value) { this.setBigUint64(72, value); }
    get bq_bb() { return this.boardView.getBigUint64(72, true); }
    // Getter/Setter for King BitBoards
    set wk_bb(value) { this.setBigUint64(80, value); }
    get wk_bb() { return this.boardView.getBigUint64(80, true); }
    set bk_bb(value) { this.setBigUint64(88, value); }
    get bk_bb() { return this.boardView.getBigUint64(88, true); }

    logBoard() {
        console.log(`wp_bb: ${this.wp_bb.toString(16)}`);
        console.log(`bp_bb: ${this.bp_bb.toString(16)}`);
        console.log(`wn_bb: ${this.wn_bb.toString(16)}`);
        console.log(`bn_bb: ${this.bn_bb.toString(16)}`);
        console.log(`wb_bb: ${this.wb_bb.toString(16)}`);
        console.log(`bb_bb: ${this.bb_bb.toString(16)}`);
        console.log(`wr_bb: ${this.wr_bb.toString(16)}`);
        console.log(`br_bb: ${this.br_bb.toString(16)}`);
        console.log(`wq_bb: ${this.wq_bb.toString(16)}`);
        console.log(`bq_bb: ${this.bq_bb.toString(16)}`);
        console.log(`wk_bb: ${this.wk_bb.toString(16)}`);
        console.log(`bk_bb: ${this.bk_bb.toString(16)}`);
    }
}

export default Board;
