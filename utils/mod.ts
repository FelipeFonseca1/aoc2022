export {enumerate, range, first } from "https://deno.land/x/itertools@v1.1.1/mod.ts";
export { split_lines, split_words, split_letters, split_blocks } from "./input.ts";

export function read_input(file_name: string): Promise<string> {
  return Deno.readTextFile(file_name);
}

export async function list_files(folder: string): Promise<Array<string>> {
  const files: Array<string> = [];
  for await (const dirEntry of Deno.readDir(folder)) {
    files.push(dirEntry.name);
  }
  return files;
}
