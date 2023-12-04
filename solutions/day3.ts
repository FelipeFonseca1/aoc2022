import { split_lines, split_letters, first } from "../utils/mod.ts";

export function sol(input: string) {
  return split_lines(input).map(split_half)
    .map(turn_to_sets).map(find_repeated)
    .map(priorities).reduce((acc, val) => acc + val, 0);
}

function find_repeated([a, b]: Array<Set<string>> = []): string {
  return first(a.keys(), (k:string) => b.has(k)) || "";
}

function turn_to_sets(arr: Array<string>) {
  return arr.map(split_letters).map(letters => new Set(letters));
}

function split_half(line: string) {
  const mid = line.length / 2;
  return [line.substring(0, mid), line.substring(mid)];
}

function priorities(char: string) {
  const num = char.charCodeAt(0);
  return num < 91 ? num - 65 + 27 : num - 97 + 1;
}