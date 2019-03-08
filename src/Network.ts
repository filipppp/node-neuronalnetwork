import { Layer } from "./Layer";
import { Matrix } from "./Matrix";

export class Network {
  private layers: Layer[];

  constructor(layers: Layer[]) {
    // Initialize Layers and their weights
    this.layers = layers;
    // Set all weights from every layer to a random number between -1 and 1
    for (let i = 1; i < this.layers.length; i++) {
      this.layers[i].weights = new Matrix(this.layers[i].nodeCount, this.layers[i - 1].nodeCount)
        .random();
    }
  }

  train(inputs: number[], outputs: number[]) {
    // Verify input and output array lengths from the parameters
    if (inputs.length !== this.layers[0].nodeCount) throw new Error("Input Length does not match input layer nodes.");
    if (outputs.length !== this.layers[this.layers.length - 1].nodeCount) throw new Error("Output Length does not match Output layer nodes.");

  }

  predict(inputs: number[]): number[] {
    // Check if prediction input count matches with the input layer node count
    if (inputs.length !== this.layers[0].nodeCount) throw new Error("Input Length does not match input layer nodes.");

    // Set the input layer neurons to the passed inputs
    this.layers[0].neurons = Matrix.from1DArray(inputs);

    // Feed forward algorithm
    for (let i = 1; i < this.layers.length; i++) {
      this.layers[i].neurons = this.layers[i].weights
        .product(this.layers[i - 1].neurons)
        .add(this.layers[i].biases)
        .map(this.layers[i].activationFunction.activationFunc);
    }

    // Return predicted output
    return this.layers[this.layers.length - 1].neurons.to1DArray();
  }

}
