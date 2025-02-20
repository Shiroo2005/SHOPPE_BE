export const trimArray = (arr: any[]) => {
  return [...new Set(arr)]
}
