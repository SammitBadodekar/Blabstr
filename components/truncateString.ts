export function truncateString(name: string, maxWidth: number) {
  if (name.length * 10 > maxWidth) {
    // assume ~10px per char
    const charCount = Math.floor(maxWidth / 10) - 1;
    return `${name.substring(0, charCount)}...`;
  }
  return name;
}
