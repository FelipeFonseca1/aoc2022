import { filter, split_lines } from "../utils/mod.ts";

type Data = {
  directories: Map<string, number>;
  path: Array<string>;
};

const MAX = 100_000;
const SPACE = 30_000_000;
const TOTAL = 70_000_000;
const RE_COMMAND = /(ls|cd)\s*(\w+$|\/$|\.\.$|$)/;
const RE_FILE = /(\d+)\s.*/;
const base_commands: Record<string, (data: Data) => Data> = {
  "/": (data: Data) => ({ ...data, path: [] }),
  "..": (data: Data) => ({ ...data, path: data.path.slice(0, -1) }),
};

export function sol(input: string) {
  const data: Data = {
    directories: new Map(),
    path: [],
  };
  const result = split_lines(input).reduce(reduce_data, data);
  return filter(result.directories.values(), (x: number) => x <= MAX).reduce(
    (acc, x) => acc + x,
    0,
  );
}

export function sol_part2(input: string) {
  const data: Data = {
    directories: new Map(),
    path: [],
  };
  const result = split_lines(input).reduce(reduce_data, data);
  const size_left = TOTAL - (result.directories.get("/") || 0);
  const to_free = SPACE - size_left;
  return filter(result.directories.values(), (x: number) => x >= to_free)
    .reduce((min: number, x: number) => min > x ? x : min, TOTAL);
}

function reduce_data(data: Data, line: string) {
  if (is_command(line)) {
    return command(data, line);
  }
  const [_, num] = line.match(RE_FILE) || [];
  if (num) {
    return { ...data, directories: update_directories(data, Number(num)) };
  }
  return data;
}

function update_directories({ directories, path }: Data, num: number) {
  directories.set("/", num + (directories.get("/") || 0));
  return path.reduce(({ dirs, acc_path }, dir) => {
    acc_path = acc_path.concat("/", dir);
    dirs.set(acc_path, num + (dirs.get(acc_path) || 0));
    return { dirs, acc_path };
  }, { dirs: directories, acc_path: "" })["dirs"];
}

function is_command(line: string) {
  return line.charAt(0) === "$";
}

function command(data: Data, line: string) {
  const [_, comm_type, arg] = line.match(RE_COMMAND)!;
  if (comm_type === "cd") {
    const func = base_commands[arg] ||
      ((data: Data) => ({ ...data, path: data.path.concat(arg) }));
    return func(data);
  }
  return data;
}
