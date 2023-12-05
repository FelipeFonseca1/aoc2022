export {
  enumerate,
  first,
  range,
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
  const stat = await Deno.stat(file_name);
  if (stat) {
    return Deno.readTextFile(file_name);
  }
  return Deno.readTextFile(bkp_file_name || "./.env");
}

export async function list_files(folder: string): Promise<Array<string>> {
  const files: Array<string> = [];
  for await (const dirEntry of Deno.readDir(folder)) {
    files.push(dirEntry.name);
  }
  return files;
}
