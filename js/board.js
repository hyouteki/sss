class Board {
    static SIZE = 8 * 12; // sizeof(uint64_t) * 12 BitBoards
    constructor(writer) {
        // Initialize the memory buffer and data view for the board
        this.offset = writer.reserve(Board.SIZE);
        this.boardBuffer = new Uint8Array(writer.memory.buffer, this.offset, Board.SIZE);
        this.boardBuffer.fill(0);
        this.boardView = new DataView(this.boardBuffer.buffer);
    }

    // true for using little-endian by default
    setBigUint64(offset, value) {
        this.boardView.setBigUint64(offset, value, true);
    }
    getBigUint64(offset) {
        this.boardView.getBigUint64(offset, true);
    }

    // Getter/Setter for Pawn BitBoards
    set wp_bb(value) { this.setBigUint64(0, value); }
    get wp_bb() { return this.getBigUint64(0); }
    set bp_bb(value) { this.setBigUint64(8, value); }
    get bp_bb() { return this.getBigUint64(8); }
    // Getter/Setter for Knight BitBoards    
    set wn_bb(value) { this.setBigUint64(16, value); }
    get wn_bb() { return this.getBigUint64(16); }
    set bn_bb(value) { this.setBigUint64(24, value); }
    get bn_bb() { return this.getBigUint64(24); }
    // Getter/Setter for Bishop BitBoards
    set wb_bb(value) { this.setBigUint64(32, value); }
    get wb_bb() { return this.getBigUint64(32); }
    set bb_bb(value) { this.setBigUint64(40, value); }
    get bb_bb() { return this.getBigUint64(40); }
    // Getter/Setter for Rook BitBoards
    set wr_bb(value) { this.setBigUint64(48, value); }
    get wr_bb() { return this.getBigUint64(48); }
    set br_bb(value) { this.setBigUint64(56, value); }
    get br_bb() { return this.getBigUint64(56); }
    // Getter/Setter for Queen BitBoards
    set wq_bb(value) { this.setBigUint64(64, value); }
    get wq_bb() { return this.getBigUint64(64); }
    set bq_bb(value) { this.setBigUint64(72, value); }
    get bq_bb() { return this.getBigUint64(72); }
    // Getter/Setter for King BitBoards
    set wk_bb(value) { this.setBigUint64(80, value); }
    get wk_bb() { return this.getBigUint64(80); }
    set bk_bb(value) { this.setBigUint64(88, value); }
    get bk_bb() { return this.getBigUint64(88); }

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

    parseFen(fen) {
        let row = 0;
        let col = 0;
        for (let c of fen) {
            if (/\d/.test(c)) {
                col += parseInt(c, 10);
                continue;
            }
            switch (c) {
            case 'r': // Black rook
                this.br_bb = BigInt(this.br_bb) | createBigUint64(row, col);
                break;
            case 'n': // Black knight
                this.bn_bb |= createBigUint64(row, col);
                break;
            case 'b': // Black bishop
                this.bb_bb |= createBigUint64(row, col);
                break;
            case 'q': // Black queen
                this.bq_bb |= createBigUint64(row, col);
                break;
            case 'k': // Black king
                this.bk_bb |= createBigUint64(row, col);
                break;
            case 'p': // Black pawn
                this.bp_bb |= createBigUint64(row, col);
                break;
            case 'R': // White rook
                this.wr_bb |= createBigUint64(row, col);
                break;
            case 'N': // White knight
                this.wn_bb |= createBigUint64(row, col);
                break;
            case 'B': // White bishop
                this.wb_bb |= createBigUint64(row, col);
                break;
            case 'Q': // White queen
                this.wq_bb |= createBigUint64(row, col);
                break;
            case 'K': // White king
                this.wk_bb |= createBigUint64(row, col);
                break;
            case 'P': // White pawn
                this.wp_bb |= createBigUint64(row, col);
                break;
            case '/': // End of row
                row += 1;
                col = 0;
                break;
            default:
                console.log(`Invalid character in FEN: ${c}`);
            }
            col += 1;
        }
    }
}

export function createBigUint64(row, col) {
    const bitPosition = row*8 + col;
    return 1n << BigInt(bitPosition);
}


export default Board;
