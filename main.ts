import { run_solutions } from "./solutions/mod.ts";
import { read_input } from "./utils/mod.ts";

if (import.meta.main) {
  const day = Deno.args[0];
  run_solutions(day, Deno.args.length > 1);
  //read_input("./resources/day1.txt").then(str => console.log(str));
}
