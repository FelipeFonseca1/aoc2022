import {split_blocks, split_lines, split_letters} from "../utils/mod.ts";

export function sol(input: string) {
  const [stack_block, moves_block] = split_blocks(input);
  const compact = split_lines(stack_block).toReversed()
    .map(split_letters)
    .map(line => line.filter((_, i) => i % 4 === 1));
  const stack = compact.reduce(transpose, [...compact[0].map(_ => [])]);
  return split_lines(moves_block).map(line => line.match(/move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)/))
    .map(match => ({num: Number(match![1]), from: Number(match![2]) - 1, to: Number(match![3]) - 1}))
    .reduce(move, stack)
    .map(column => column.pop()).join("");
}
 
export function sol_part2(input: string) {
  const [stack_block, moves_block] = split_blocks(input);
  const compact = split_lines(stack_block).toReversed()
    .map(split_letters)
    .map(line => line.filter((_, i) => i % 4 === 1));
  const stack = compact.reduce(transpose, [...compact[0].map(_ => [])]);
  return split_lines(moves_block).map(line => line.match(/move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)/))
    .map(match => ({num: Number(match![1]), from: Number(match![2]) - 1, to: Number(match![3]) - 1}))
    .reduce(move2, stack)
    .map(column => column.pop()).join("");
}

function transpose(array: string[][] = [], line: string[]) {
  return line.reduce((arr, char, i) => {
    if (char !== " ") {
      arr[i].push(char);
    }
    return arr;
  }, array);
}

function move(stack: string[][], {num, from, to}: {num: number, from: number, to: number}) {
  let x = 0;
  while(x < num) {
    stack[to].push(stack[from].pop()!);
    x = x + 1;
  }
  return stack;
}

function move2(stack: string[][], {num, from, to}: {num: number, from: number, to: number}) {
  stack[to].push(...stack[from].slice(-num));
  stack[from] = stack[from].slice(0, -num);
  return stack;
}