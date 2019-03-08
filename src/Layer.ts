import { Matrix } from "./Matrix";
import { ActivationFunction } from "./ActivationFunctions";

export class Layer {
  public weights: Matrix;
  public neurons: Matrix;
  public biases: Matrix;

  constructor(
    public nodeCount: number,
    public activationFunction: ActivationFunction
  ) {
    this.neurons = new Matrix(this.nodeCount, 1);
    this.biases = new Matrix(this.nodeCount, 1);
  }
}
