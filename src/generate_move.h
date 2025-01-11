#ifndef SSS_GENERATE_MOVE_H_
#define SSS_GENERATE_MOVE_H_

#include <src/board.h>
#include <src/common.h>

/*

   0   1   2   3   4   5   6   7
   8   9  10  11  12  13  14  15
  16  17  18  19  20  21  22  23
  24  25  26  27  28  29  30  31
  32  33  34  35  36  37  38  39
  40  41  42  43  44  45  46  47
  48  49  50  51  52  53  54  55
  56  57  58  59  60  61  62  63

*/

BoardPos gen_rank_pos(uchar rank) {
    if (rank > 7) {
        error("gen_rank_pos: rank > 7");
        return 0;
    }
    uchar start = 56 - (rank<<3);
    BoardPos ret = 0;
    for (uchar i = 0; i < 8; ++i) {
        ret += 1<<(start+i);
    }
    
    return ret;
}

#endif // SSS_GENERATE_MOVE_H_
