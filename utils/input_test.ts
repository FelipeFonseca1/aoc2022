import { assertEquals } from "https://deno.land/std@0.207.0/assert/mod.ts";
import {
  split_blocks,
  split_letters,
  split_lines,
  split_words,
} from "./input.ts";

Deno.test(function split_lines_test() {
  const text1 = `asd
  qweqweqweqwe
  11111`;
  const text2 = `asd
  qweqweqweqwe
  222
  333`;
  assertEquals(split_lines(text1).length, 3);
  assertEquals(split_lines(text2).length, 4);
});

Deno.test(function split_blocks_test() {
  const text = `asd
  qweqweqweqwe
  11111
  
  22222`;
  assertEquals(split_blocks(text).length, 2);
});

Deno.test(function split_words_test() {
  const text1 = `asd qweqweqweqwe 11111`;
  const text2 = `asd qweqweqweqwe 222     333 `;
  assertEquals(split_words(text1).length, 3);
  assertEquals(split_words(text2).length, 4);
});

Deno.test(function split_letters_test() {
  const text = "asd";
  assertEquals(split_letters(text).length, 3);
});
