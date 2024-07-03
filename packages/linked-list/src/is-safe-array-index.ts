export const isSafeArrayIndex = (propKey: string) =>
  propKey === String(Number.parseInt(propKey, 10))
