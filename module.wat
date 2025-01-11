(module
  (type (;0;) (func (param i32)))
  (type (;1;) (func))
  (import "env" "error" (func $error (type 0)))
  (func $test (type 1)
    i32.const 1024
    call $error)
  (memory (;0;) 2)
  (global $__stack_pointer (mut i32) (i32.const 66592))
  (export "memory" (memory 0))
  (export "test" (func $test))
  (data $.rodata (i32.const 1024) "gen_rank_pos: rank > 7\00"))
