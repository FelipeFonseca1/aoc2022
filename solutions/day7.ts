import {split_letters, split_lines, filter} from "../utils/mod.ts";

type Data = {
  directories: Map<string, number>;
  path: Array<string>;
};

const MAX = 100_000;
const RE_COMMAND = /(ls|cd)\s*(\w+$|\/$|\.\.$|$)/;
const RE_FILE = /(\d+)\s.*/;
const base_commands: Record<string, (data: Data) => Data> = {
  "/": (data: Data) => ({ ...data, path: []}),
  "..": (data: Data) => ({...data, path: data.path.slice(0,-1)})
}

export function sol(input: string) {
  const data: Data = {
    directories: new Map(),
    path:[]
  }
  const result = split_lines(input).reduce(reduce_data, data);
  console.log(result)
  return filter(result.directories.values(), (x: number) => x <= MAX).reduce((acc, x) => acc + x, 0);
}
 
export function sol_part2(input: string) {
  return split_letters(input);
}

function reduce_data(data: Data, line: string) {
  if (is_command(line)) {
    return command(data, line);
  }
  const [_, num] = line.match(RE_FILE) || [];
  if (num) {
    return { ...data, directories: update_directories(data, Number(num))};
  }
  return data;
}

function update_directories({directories, path}: Data, num: number ) {
  return path.reduce((obj, dir) => {
    obj.acc_path = obj.acc_path.concat("/", dir);
    obj.directories.set(obj.acc_path, Number(num) + (obj.directories.get(obj.acc_path) || 0));
    return obj;
  },{directories, acc_path: ""})["directories"];
}

function is_command(line: string) {
  return line.charAt(0) === "$";
}

function command(data: Data, line: string) {
  const [_, comm_type, arg] = line.match(RE_COMMAND)!;
  if (comm_type === "cd") {
    const func = base_commands[arg] || 
      ((data: Data) => ({...data, path: data.path.concat(arg)}));
    return func(data);
  }
  return data;
}