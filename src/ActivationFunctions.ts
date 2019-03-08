import { Functions } from './Functions';

export class ActivationFunction {
  constructor(
    /*public activationFunc: (num: number | number[]) => number[] | number,
    public derivFunc: (num: number) => number[] | number,*/
    public activationFunc: (num: number) => number,
    public derivFunc: (num: number) => number,
  ) {}

  public static sigmoid(): ActivationFunction {
    return new ActivationFunction(Functions.sigmoid,
      (num) => Functions.sigmoid(num) * (1 - Functions.sigmoid(num)));
  }

 /* public static softmax(arr: number[]): ActivationFunction {
    return arr.map((value: number) => Math.exp(value) / arr.map((x: number) => Math.exp(x)).reduce((a: number, b: number) => a + b))
  } */

  public static identity(): ActivationFunction {
    return new ActivationFunction(Functions.identity, () => 1);
  }

  public static relu(): ActivationFunction {
    return new ActivationFunction(Functions.relu, num => {
      return num > 0 ? 1 : 0;
    });
  }

}
