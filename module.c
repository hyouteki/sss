typedef unsigned long long uint64_t;
typedef uint64_t BitBoard;
typedef char BoardPos;

#define STATIC_ASSERT(cond, msg) typedef char static_assertion_##msg[(cond)? 1: -1]
STATIC_ASSERT(sizeof(unsigned long long) == 8, sizeof_unsigned_long_long_must_be_8_bytes);
STATIC_ASSERT(sizeof(char) == 1, sizeof_char_must_be_1_byte);

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
