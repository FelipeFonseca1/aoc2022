import { first, split_letters, split_lines} from "../utils/mod.ts";

export function sol(input: string) {
  return split_lines(input).map(split_half)
    .map(turn_to_sets).map(find_repeated)
    .map(priorities).reduce((acc, val) => acc + val, 0);
}

export function sol_part2(input: string) {
  return split_lines(input).reduce(reduce_to_blocks3, [])
  .map(turn_to_sets).map(find_repeated2)
  .map(priorities).reduce((acc, val) => acc + val, 0);
}

function reduce_to_blocks3(blocks: string[][], line: string, index: number): string[][] {
  if (index % 3 === 0) {
    blocks.push([line]);
  } else {
    blocks.at(-1)!.push(line);
  }
  return blocks;
}

function find_repeated([a, b]: Array<Set<string>> = []): string {
  return first(a.keys(), (k: string) => b.has(k)) || "";
}

function find_repeated2([a, b, c]: Array<Set<string>> = []): string {
  return first(a.keys(), (k: string) => b.has(k) && c.has(k)) || "";
}

function turn_to_sets(arr: Array<string>) {
  return arr.map(split_letters).map((letters) => new Set(letters));
}

function split_half(line: string) {
  const mid = line.length / 2;
  return [line.substring(0, mid), line.substring(mid)];
}

function priorities(char: string) {
  const num = char.charCodeAt(0);
  return num < 91 ? num - 65 + 27 : num - 97 + 1;
}
