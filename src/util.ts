export function generateId(): string {
  return (
    'juno-' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

export function distinct<T>(array: Array<T>): Array<T> {
  return [...new Set(array)];
}
