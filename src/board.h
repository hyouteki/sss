#ifndef SSS_BOARD_H_
#define SSS_BOARD_H_

#include "common.h"

typedef uint64_t BitBoard;
typedef uint64_t BoardPos;

typedef struct Board {
    // Pawn BitBoards
    BitBoard wp_bb;
    BitBoard bp_bb;
    // Knight BitBoards
    BitBoard wn_bb;
    BitBoard bn_bb;
    // Bishop BitBoards
    BitBoard wb_bb;
    BitBoard bb_bb;
    // Rook BitBoards
    BitBoard wr_bb;
    BitBoard br_bb;
    // Queen BitBoards
    BitBoard wq_bb;
    BitBoard bq_bb;
    // King BitBoards
    BitBoard wk_bb;
    BitBoard bk_bb;
} Board;

BoardPos full_board();
BoardPos occupancies(Board *board);

BoardPos full_board() {
    BoardPos ret = 0;
    for (uchar i = 0; i < 64; ++i) {
        ret += (1<<i);
    }
    return ret;
}

BoardPos occupancies(Board *board) {
    return board->wp_bb | board->bp_bb | board->wn_bb
        | board->bn_bb | board->wb_bb | board->bb_bb
        | board->wr_bb | board->br_bb | board->wq_bb
        | board->bq_bb | board->wk_bb | board->bk_bb;
}

#endif // SSS_BOARD_H_
