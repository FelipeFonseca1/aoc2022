import {split_lines} from "../utils/mod.ts";

export function sol(input: string) {
  return split_lines(input).map(line => line.match(/(\d+)-(\d+),(\d+)-(\d+)/))
    .map(matched_to_num_array).filter(contains).length;
}
 
export function sol_part2(input: string) {
  return split_lines(input).map(line => line.match(/(\d+)-(\d+),(\d+)-(\d+)/))
  .map(matched_to_num_array).filter(overlaps).length;
}

function matched_to_num_array(matched: RegExpMatchArray | null): number[] {
  return [1,2,3,4].map(n => matched?.[n] || "0").map(Number);
}

function contains([a1, a2, b1, b2]: number[]): boolean {
  const [big1, big2, small1, small2] =
    a2 - a1 < b2 - b1 ? [b1, b2, a1, a2] : [a1, a2, b1, b2] ;
  return !(small1 < big1 || small2 > big2);
}

function overlaps([a1, a2, b1, b2]: number[]): boolean {
  const [left1, left2, right1, right2] =
    a1 > b1 ? [b1, b2, a1, a2] : [a1, a2, b1, b2] ;
  return left2 >= right1 && left1 <= right2;
}