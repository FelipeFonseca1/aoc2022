import { split_lines, split_blocks } from "../utils/mod.ts";

export function sol(input: string) {
  return split_blocks(input).map(sum_cals).reduce((max, cals) => {
    return Math.max(max, cals);
  }, 0);
}

export function sol_part2(input: string) {
    return split_blocks(input).map(sum_cals).reduce((max3, cals) => {
        return cals > max3[0] ? [cals, max3[0], max3[1]] :
            cals > max3[1] ? [ max3[0], cals, max3[1]] :
            cals > max3[2] ? [ max3[0], max3[1], cals] :
            max3;
    }, [0, 0, 0]).reduce((acc, val) => acc + val, 0);
}

function sum_cals(block: string) {
    return split_lines(block).reduce((acc, val) => acc + Number(val.trim()), 0);
}
