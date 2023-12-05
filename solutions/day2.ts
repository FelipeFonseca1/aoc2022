import { split_lines, split_words } from "../utils/mod.ts";

/**
 * ROCK, PAPER, SCISSORS | A, B, C | X, Y, Z
 */
const points_me: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};
/**
 * 0 if you lost, 3 if the round was a draw, and 6 if you won
 */
const points_match: Record<string, Record<string, number>> = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};

/**
 * X lose, Y means draw, and Z means win
 */
const points_match2: Record<string, Record<string, number>> = {
  A: { X: 0 + 3, Y: 3 + 1, Z: 6 + 2 },
  B: { X: 0 + 1, Y: 3 + 2, Z: 6 + 3 },
  C: { X: 0 + 2, Y: 3 + 3, Z: 6 + 1 },
};
export function sol(input: string) {
  return split_lines(input).map(split_words)
    .map(([op, me] = []) => points_me[me] + points_match[op][me])
    .reduce((acc, val) => acc + val, 0);
}

export function sol_part2(input: string) {
  return split_lines(input).map(split_words)
    .map(([op, match] = []) => points_match2[op][match])
    .reduce((acc, val) => acc + val, 0);
}
