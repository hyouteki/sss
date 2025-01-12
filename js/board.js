export class Board {
    static SIZE = 8 * 12; // sizeof(uint64_t) * 12 BitBoards
    constructor(writer) {
        // Initialize the memory buffer and data view for the board
        this.offset = writer.reserve(Board.SIZE);
        this.boardBuffer = new Uint8Array(writer.memory.buffer, this.offset, Board.SIZE);
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

    setFen(fen) {
        this.boardBuffer.fill(0);
        const symbolTable = {
            'P': this.wp, 'p': this.bp,
            'N': this.wn, 'n': this.bn,
            'B': this.wb, 'b': this.bb,
            'R': this.wr, 'r': this.br,
            'Q': this.wq, 'q': this.bq,
            'K': this.wk, 'k': this.bk,
        };
        let row = 0;
        let col = 0;
        for (let c of fen) {
            if (/\d/.test(c)) {
                col += parseInt(c, 10);
                continue;
            }
            if (c === '/') {
                row += 1;
                col = 0;
                continue;
            }
            // TODO: Check for c not being present in the symbolTable
            //       a.k.a. incorrect FEN
            this.setBigUint64(symbolTable[c], this.getBigUint64(symbolTable[c])
                              | createBigUint64(row, col));
            col += 1;
        }
    }

    getFen() {
        const symbolTable = {
            [this.wp]: 'P', [this.bp]: 'p',
            [this.wn]: 'N', [this.bn]: 'n',
            [this.wb]: 'B', [this.bb]: 'b',
            [this.wr]: 'R', [this.br]: 'r',
            [this.wq]: 'Q', [this.bq]: 'q',
            [this.wk]: 'K', [this.bk]: 'k',
        };
        let fen = "";
        for (let row = 0; row < 8; row++) {
            let empty = 0;
            for (let col = 0; col < 8; col++) {
                let pieceFound = false;
                for (const [offset, symbol] of Object.entries(symbolTable)) {
                    const bitboard = this.getBigUint64(parseInt(offset));
                    if (bitboard & createBigUint64(row, col)) {
                        if (empty > 0) {
                            fen += empty;
                            empty = 0;
                        }
                        fen += symbol;
                        pieceFound = true;
                        break;
                    }
                }
                if (!pieceFound) {
                    empty++;
                }
            }
            if (empty > 0) {
                fen += empty;
            }
            if (row < 7) {
                fen += '/';
            }
        }
        return fen;
    }
}

export function createBigUint64(row, col) {
    const bitPosition = row*8 + col;
    return 1n << BigInt(bitPosition);
}

export function squareToBigUint64(sq) {
    const col = sq.charCodeAt(0) - 'a'.charCodeAt(0);
    const row = parseInt(sq[1], 10) - 1;
    return createBigUint64(row, col);
}
