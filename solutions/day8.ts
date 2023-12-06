import {split_lines, split_letters, transpose} from "../utils/mod.ts";

export function sol(input: string) {
  const A = split_lines(input).map(split_letters).map(line => line.map(Number));
  const T = transpose(A);
  return T[0].flatMap((_, j) => A[j].map((v, i) => {
    return check_row_right(A[j], i, v) || check_row_left(A[j], i, v) ||
      check_row_right(T[i], j, v) || check_row_left(T[i], j, v);
  })).filter(Boolean).length;
}
 
export function sol_part2(input: string) {
  const A = split_lines(input).map(split_letters).map(line => line.map(Number));
  const T = transpose(A);
  return T[0].flatMap((_, j) => A[j].map((v, i) => {
    return scenic_row_right(A[j], i, v) * scenic_row_left(A[j], i, v) *
    scenic_row_right(T[i], j, v) * scenic_row_left(T[i], j, v);
  })).reduce((max, x) => Math.max(max, x), 0);
}

function check_row_left(row: number[], index: number, tree: number) {
  return row.slice(0, index).every(x => x < tree);
}

function check_row_right(row: number[], index: number, tree: number) {
  return row.slice(index+1).every(x => x < tree);
}


function scenic_row_left(row: number[], index: number, tree: number) {
  return row.slice(0, index).reduceRight((val, x, _, arr) => {
    if (tree <= x) {
      arr.length = 0;
    }
    return val + 1;
  }, 0);
}

function scenic_row_right(row: number[], index: number, tree: number) {
  return row.slice(index+1).reduce((val, x, _, arr) => {
    if (tree <= x) {
      arr.length = 0;
    }
    return val + 1;
  }, 0);
}