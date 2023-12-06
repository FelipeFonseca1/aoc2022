import {split_letters} from "../utils/mod.ts";

export function sol(input: string) {
  return split_letters(input).reduce(distinct_n(4), []);
}
 
export function sol_part2(input: string) {
  return split_letters(input).reduce(distinct_n(14), []);
}

function distinct_n(n: number) {
  return function _distinct_n(lastn: Array<string> | number, x: string, index: number, arr: string[]) {
      if (typeof lastn === "number") { //compiler happy
        return lastn;
      }
      const setn = new Set(lastn);
      if (setn.size === n) {
        arr.length = 0; //break early
        return index;
      }
      return lastn.length < n ?  lastn.concat(x) : lastn.slice(1).concat(x);
  }
}
