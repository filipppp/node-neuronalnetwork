export class ActivationFunction {
  constructor(
    public activationFunc,
    public derivFunc
  ) {}

    public static sigmoid(num: number): number {
      return 1 / (Math.E ** -num + 1);
    }

    public static softmax(arr: number[]) {
      return arr.map((value: number) => Math.exp(value) / arr.map((x: number) => Math.exp(x)).reduce((a: number, b: number) => a + b))
    }

    public static identity(num: number) {
      return num;
    }

    public static relu(num: number) {
      return num > 0 ? num : 0;
    }

}
