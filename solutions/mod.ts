import { load } from "https://deno.land/std@0.208.0/dotenv/mod.ts";
import { list_files, read_input } from "../utils/mod.ts";

export async function run_solutions(day: string, part2: boolean) {
  const env = await load();
  const folder = env["LOCAL_SOLUTIONS_FOLDER"];
  const inputs_folder = env["LOCAL_RESOURCES_FOLDER"];
  if (!day) {
    await run_all_solutions(folder!, inputs_folder!);
    return;
  }
  const mod = await import(`./day${day}.ts`);
  if (part2) {
    const input = await read_input(`${inputs_folder}day${day}_part2.txt`);
    const result = mod.sol_part2(input);
    console.log(`day${day} part2`, result);
    return;
  } else {
    const input = await read_input(`${inputs_folder}day${day}.txt`);
    const result = mod.sol(input);
    console.log(`day${day}`, result);
  }
  console.log("Done");
}

async function run_all_solutions(folder: string, inputs_folder: string) {
  const list = (await list_files(folder)).filter((name) => name !== "mod.ts");
  for (const name of list) {
    const full_name = `./${name}`;
    const mod = await import(full_name);
    const input = await read_input(
      `${inputs_folder}${name.replace(".ts", ".txt")}`,
    );
    const result = mod.sol(input);
    const input2 = await read_input(
      `${inputs_folder}${name.replace(".ts", "_part2.txt")}`,
    );
    const result2 = mod.sol_part2(input2);
    console.log(name, result, "| Part2", result2);
  }
  console.log("All Done");
}
