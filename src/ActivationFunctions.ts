import { Functions } from "./Functions";

export class ActivationFunction {
  constructor(
    /*public activationFunc: (num: number | number[]) => number[] | number,
    public derivFunc: (num: number) => number[] | number,*/
    public activationFunc: (num: number) => number,
    public derivFunc: (num: number) => number,
  ) {}

  public static sigmoid(): ActivationFunction {
    return new ActivationFunction(Functions.sigmoid, Functions.Dsigmoid);
  }

 /* TODO: Implement softmax function
  public static softmax(arr: number[]): ActivationFunction {
    return arr.map((value: number) => Math.exp(value) / arr.map((x: number) => Math.exp(x)).reduce((a: number, b: number) => a + b))
  } */

  public static identity(): ActivationFunction {
    return new ActivationFunction(Functions.identity, Functions.Didentity);
  }

  public static relu(): ActivationFunction {
    return new ActivationFunction(Functions.relu, Functions.Drelu);
  }

}
