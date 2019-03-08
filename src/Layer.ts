import { Matrix } from "./Matrix";

export class Layer {
  public weights: Matrix[];
  public neurons: Matrix;
  public biases: Matrix;

  constructor(
    public nodeCount: number,
    public activationFunction: (num: number | number[]) => number[]
  ) {
    this.neurons = new Matrix(this.nodeCount, 1);
    this.biases = new Matrix(this.nodeCount, 1);
  }





}
