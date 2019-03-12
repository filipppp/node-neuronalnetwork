import { Matrix } from "./Matrix";
import { ActivationFunction } from "./ActivationFunctions";

export class Layer {
  public weights: Matrix;
  public neurons: Matrix;
  public biases: Matrix;

  public deltaWeightSum: Matrix;
  public deltaBiasSum: Matrix;

  public previousWeight: Matrix;

  constructor(
    public nodeCount: number,
    public activationFunction: ActivationFunction = ActivationFunction.sigmoid()
  ) {
    // Initialize neurons and biases of the layers to a beginning value
    this.neurons = new Matrix(this.nodeCount, 1);
    this.biases = new Matrix(this.nodeCount, 1).random();
    this.deltaBiasSum = new Matrix(this.nodeCount, 1);
  }

}
