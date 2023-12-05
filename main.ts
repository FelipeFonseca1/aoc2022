import { run_solutions } from "./solutions/mod.ts";

if (import.meta.main) {
  const day = Deno.args[0];
  const with_test =
    (Deno.args[2] || Deno.args[1] || "no").toLowerCase() === "test";
  const part2 = (with_test && Deno.args.length > 2) ||
    (!with_test && Deno.args.length > 1);
  run_solutions(day, part2, with_test);
}
