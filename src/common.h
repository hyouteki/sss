#ifndef SSS_COMMON_H_
#define SSS_COMMON_H_

typedef unsigned long long uint64_t;
#define STATIC_ASSERT(cond, msg) typedef char static_assertion_##msg[(cond)? 1: -1]
STATIC_ASSERT(sizeof(unsigned long long) == 8, sizeof_unsigned_long_long_must_be_8_bytes);
/* STATIC_ASSERT(sizeof(unsigned char) == 1, sizeof_char_must_be_1_byte); */
typedef unsigned char uchar;
typedef int bool;
#define false 0
#define true 1

// Defined in JS
extern void print(const char *);
extern void error(const char *);

#endif // SSS_COMMON_H_
