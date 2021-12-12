export function addItemInArray(array, index, newItem) {
  return [...array.slice(0, index), newItem, ...array.slice(index)];
}
