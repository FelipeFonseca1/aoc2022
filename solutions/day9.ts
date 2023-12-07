import { split_letters, split_lines, transpose } from "../utils/mod.ts";

type Position = [number, number];
type Rope = {
  head: Position;
  tail: Position;
  tail_h: Set<string>;
  body?: Position[]
};
type Direction = typeof DIRECTIONS[number];

const DIRECTIONS = ["U", "D", "L", "R"] as const;
const RE_MOVE = /^(U|D|L|R)\s(\d+)$/;
const direction_adjust: Record<Direction,Position> = {
  U: [0, 1],
  D: [0, -1],
  R: [1, 0],
  L: [-1, 0]
}

export function sol(input: string) {
  const rope: Rope = {
    head: [0, 0],
    tail: [0, 0],
    tail_h: new Set(["0,0"])
  };
  return split_lines(input).reduce((rope, line) => {
    const [_, dir, arg] = line.match(RE_MOVE)!;
    assertDirection(dir);
    return move_head(rope, Number(arg), dir);
  }, rope).tail_h.size;
}

export function sol_part2(input: string) {
  const rope: Rope = {
    head: [0, 0],
    tail: [0, 0],
    tail_h: new Set(["0,0"]),
    body: new Array(8).fill([0,0])
  };
  return split_lines(input).reduce((rope, line) => {
    const [_, dir, arg] = line.match(RE_MOVE)!;
    assertDirection(dir);
    return move_head10(rope, Number(arg), dir);
  }, rope).tail_h.size;
}

function move_head10(rope: Rope, num: number, direction: Direction): Rope {
  if (num === 0) {
    return rope;
  }
  const head = single_move(rope.head, direction);
  const body = rope.body!.reduce((acc: Position[], knot: Position, index: number) => {
    if (index === 0){
      return [tail_move(knot, acc[0])];
    }
    return [...acc, tail_move(knot, acc.at(-1)!)];
  }, [head]);
  const tail = tail_move(rope.tail, body.at(-1)!);
  return move_head10({
      head,
      tail,
      body,
      tail_h: rope.tail_h.add(String(tail)),
    }, num - 1, direction);
}

function move_head(rope: Rope, num: number, direction: Direction): Rope {
  if (num === 0) {
    return rope;
  }
  const head = single_move(rope.head, direction);
  const tail = tail_move(rope.tail, head);
  return move_head({
      head,
      tail,
      tail_h: rope.tail_h.add(String(tail))
    }, num - 1, direction);
}

function single_move([x, y]: Position, direction: Direction): Position {
  const [X, Y] = direction_adjust[direction];
  return [x + X, y + Y];
}

function tail_move([tx, ty]: Position, [x, y]: Position): Position {
  const x_delta = tx - x;
  const y_delta = ty - y;
  const X = x_delta > 1 ? -1 : x_delta < -1 ? 1 : 0;
  const Y = y_delta > 1 ? -1 : y_delta < -1 ? 1 : 0;
  const x_adj = X === 0 && Y !== 0 ? -x_delta : 0;
  const y_adj = Y === 0 && X !== 0 ? -y_delta : 0;
  return [tx + X + x_adj, ty + Y + y_adj];
}

function assertDirection(direction: string): asserts direction is Direction {
  if (!DIRECTIONS.includes(direction as Direction)) {
    throw new Error("Invalid direction " + direction);
  }
}

export function print(rope:Rope, size: number) {
  for (let i = size; i >= 0; i--) {
    const line = new Array(size).fill(".");
    const tail_line = rope.tail[0] === i ? 
      line.fill("T", rope.tail[1], rope.tail[1] + 1) : line;
    const head_line = rope.head[0] === i ?  
      tail_line.fill("H", rope.head[1], rope.head[1] + 1) : tail_line;
    console.log(head_line.join(""));
  }
  console.log("---")
}