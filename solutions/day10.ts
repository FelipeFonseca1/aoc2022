import { filter, split_lines } from "../utils/mod.ts";

type Signal = {
  cycle: number;
  X: number;
  strength: number;
};

type SignalO = {
  cycle: number;
  X: number;
  output: string;
};

const RE_COMMAND = /(addx|noop)(\s(\-{0,1}\d+)$|$)/;

export function sol(input: string) {
  const signal: Signal = {
    cycle: 0,
    X: 1,
    strength: 0
  }
  const result = split_lines(input)
    .map(line => line.match(RE_COMMAND)?.[3])
    .map(Number).reduce((sig, num) => {
      return Number.isNaN(num) ? noop(sig) : addx(sig, num);
    }, signal);
  return result.strength;
}

export function sol_part2(input: string) {
  const signal: SignalO = {
    cycle: 0,
    X: 1,
    output: ""
  }
  const result = split_lines(input)
    .map(line => line.match(RE_COMMAND)?.[3])
    .map(Number).reduce((sig, num) => {
      return Number.isNaN(num) ? noop_print(sig) : addx_print(sig, num);
    }, signal);
  return result.output;
}

function calc_strength(X: number, cycle: number, t: number, str = 0) {
  if ( t === 0) {
    return str;
  }
  if (cycle === 20 || (cycle - 20) % 40 === 0) {
    return calc_strength(X, cycle + 1, t - 1, X * cycle);
  }
  return calc_strength(X, cycle + 1, t - 1, str);
}

function noop(sig: Signal): Signal {
  const strength = sig.strength + calc_strength(sig.X, sig.cycle + 1, 1);
  return {
    ...sig,
    strength,
    cycle: sig.cycle + 1
  }
}

function addx(sig: Signal, num: number): Signal {
  const strength = sig.strength + calc_strength(sig.X, sig.cycle + 1, 2);
  return {
    strength,
    X: sig.X + num,
    cycle: sig.cycle + 2
  }
}

function noop_print(sig: SignalO): SignalO {
  const output = sig.output + pixel(sig.cycle, sig.X);
  return {
    ...sig,
    output,
    cycle: sig.cycle + 1,
  }
}

function addx_print(sig: SignalO, num: number): SignalO {
  const output = sig.output + pixel(sig.cycle, sig.X) + pixel(sig.cycle + 1, sig.X);
  return {
    output,
    X: sig.X + num,
    cycle: sig.cycle + 2,
  }
}

function pixel(cycle: number, X: number): string {
  const curr = cycle % 40;
  const br = curr === 0 ? "\n" : "";
  if (curr > X - 2 && curr < X + 2) {
    return br.concat("#");
  }
  return br.concat(".");
}