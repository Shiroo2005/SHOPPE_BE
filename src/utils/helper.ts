export const trimArray = (arr: string[]) => {
  return Array.from(new Set(arr))
}
