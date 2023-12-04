export function split_lines(text: string) {
  return text.split(/\n|\r\n/);
}
export function split_words(text: string) {
  return text.split(/\s+/).filter(Boolean);
}
