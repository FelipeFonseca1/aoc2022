export {
  enumerate,
  first,
  range,
  filter,
  map,
  reduce
} from "https://deno.land/x/itertools@v1.1.1/mod.ts";
export {
  split_blocks,
  split_letters,
  split_lines,
  split_words,
} from "./input.ts";

export async function read_input(
  file_name: string,
  bkp_file_name?: string,
): Promise<string> {
  try {
    return await Deno.readTextFile(file_name);
  } catch (_) {
    return await Deno.readTextFile(bkp_file_name || "");
  }
}

export async function list_files(folder: string): Promise<Array<string>> {
  const files: Array<string> = [];
  for await (const dirEntry of Deno.readDir(folder)) {
    files.push(dirEntry.name);
  }
  return files;
}

export function tag<T>(x: T, i: number): T {
  console.log(i, ":", x);
  return x;
}

export function filter_tag({every, first}: Record<string, number> ={}) {
  const predicate = [
    (i:number) => i < 3,
    (i:number) => i < first,
    (i:number) => i % every === 0
  ][every !== undefined ? 
    2 : first !== undefined ? 
      1 : 0];
  return function _tag(x: unknown, i: number): boolean {
    if (predicate(i)) {
      console.log(i, ":", x);
    }
    return true;
  }
}