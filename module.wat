(module
  (type (;0;) (func (param i32) (result i64)))
  (type (;1;) (func (param i32 i64) (result i64)))
  (type (;2;) (func))
  (func $occupancies (type 0) (param i32) (result i64)
    local.get 0
    i64.load offset=8
    local.get 0
    i64.load
    i64.or
    local.get 0
    i64.load offset=16
    i64.or
    local.get 0
    i64.load offset=24
    i64.or
    local.get 0
    i64.load offset=32
    i64.or
    local.get 0
    i64.load offset=40
    i64.or
    local.get 0
    i64.load offset=48
    i64.or
    local.get 0
    i64.load offset=56
    i64.or
    local.get 0
    i64.load offset=64
    i64.or
    local.get 0
    i64.load offset=72
    i64.or
    local.get 0
    i64.load offset=80
    i64.or
    local.get 0
    i64.load offset=88
    i64.or)
  (func $gen_wp_move (type 1) (param i32 i64) (result i64)
    local.get 0
    call $occupancies)
  (func $test (type 2))
  (memory (;0;) 2)
  (global $__stack_pointer (mut i32) (i32.const 66560))
  (export "memory" (memory 0))
  (export "gen_wp_move" (func $gen_wp_move))
  (export "test" (func $test)))
