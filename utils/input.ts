export function split_lines(text: string) {
  return text.split(/\n|\r\n/);
}
export function split_blocks(text: string) {
  return text.split(/\n\s+\n|\r\n\s+\r\n/);
}
export function split_words(text: string) {
  return text.split(/\s+/).filter(Boolean);
}
export function split_letters(text: string) {
  return text.split("");
}
