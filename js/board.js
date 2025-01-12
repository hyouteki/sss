class Board {
    static SIZE = 8 * 12; // sizeof(uint64_t) * 12 BitBoards
    constructor(writer) {
        // Initialize the memory buffer and data view for the board
        this.offset = writer.reserve(Board.SIZE);
        this.boardBuffer = new Uint8Array(writer.memory.buffer, this.offset, Board.SIZE);
        this.boardBuffer.fill(0);
        this.boardView = new DataView(this.boardBuffer.buffer);
        // BitBoard offsets
        this.wp = 0<<3;
        this.bp = 1<<3;
        this.wb = 2<<3;
        this.bb = 3<<3;
        this.wn = 4<<3;
        this.bn = 5<<3;
        this.wr = 6<<3;
        this.br = 7<<3;
        this.wq = 8<<3;
        this.bq = 9<<3;
        this.wk = 10<<3;
        this.bk = 11<<3;
    }

    // true for using little-endian by default
    setBigUint64(offset, value) {
        this.boardView.setBigUint64(offset, value, true);
    }
    getBigUint64(offset) {
        return this.boardView.getBigUint64(offset, true);
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
            case 'p': // Black pawn
                this.setBigUint64(this.bp, this.getBigUint64(this.bp) | createBigUint64(row, col));
                break;
            case 'n': // Black knight
                this.setBigUint64(this.bn, this.getBigUint64(this.bn) | createBigUint64(row, col));
                break;
            case 'b': // Black bishop
                this.setBigUint64(this.bb, this.getBigUint64(this.bb) | createBigUint64(row, col));
                break;
            case 'r': // Black rook
                this.setBigUint64(this.br, this.getBigUint64(this.br) | createBigUint64(row, col));
                break;
            case 'q': // Black queen
                this.setBigUint64(this.bq, this.getBigUint64(this.bq) | createBigUint64(row, col));
                break;
            case 'k': // Black king
                this.setBigUint64(this.bk, this.getBigUint64(this.bk) | createBigUint64(row, col));
                break;
            case 'P': // White pawn
                this.setBigUint64(this.wp, this.getBigUint64(this.wp) | createBigUint64(row, col));
                break;
            case 'N': // White knight
                this.setBigUint64(this.wn, this.getBigUint64(this.wn) | createBigUint64(row, col));
                break;
            case 'B': // White bishop
                this.setBigUint64(this.wb, this.getBigUint64(this.wb) | createBigUint64(row, col));
                break;
            case 'R': // White rook
                this.setBigUint64(this.wr, this.getBigUint64(this.wr) | createBigUint64(row, col));
                break;
            case 'Q': // White queen
                this.setBigUint64(this.wq, this.getBigUint64(this.wq) | createBigUint64(row, col));
                break;
            case 'K': // White king
                this.setBigUint64(this.wk, this.getBigUint64(this.wk) | createBigUint64(row, col));
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
