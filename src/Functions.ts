export class Functions {
  public static sigmoid(num: number): number {
    return 1 / (1 + Math.E ** -num);
  }
  public static Dsigmoid(num: number) {
    return num * (1 - num);
  }

  public static softmax(arr: number[]): number[] {
    return arr.map((value: number) => Math.exp(value) / arr.map((x: number) => Math.exp(x)).reduce((a: number, b: number) => a + b));
  }
  public static Dsoftmax() {
    // TODO: Implement softmax derivative
  }

  public static identity(num: number) {
    return num;
  }
  public static Didentity() {
    return 1;
  }

  public static relu(num: number) {
    return num > 0 ? num : 0;
  }
  public static Drelu(num: number) {
    return num > 0 ? 1 : 0;
  }
}
