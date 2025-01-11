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

#endif // SSS_BOARD_H_
