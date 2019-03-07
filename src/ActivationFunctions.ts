export function sigmoid(num: number) {
  return 1 / (Math.E ** -num + 1)
}

export function softmax(arr: number[]) {
  return arr.map((value: number) => Math.exp(value) / arr.map((x: number) => Math.exp(x)).reduce((a: number, b: number) => a + b))
}

export function identity(num: number) {
  return num;
}

export function relu(num: number) {
  return num > 0 ? num : 0;
}
