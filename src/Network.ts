import { Layer } from "./Layer";
import { Matrix } from "./Matrix";
import * as fs from "fs";
import { Activation, ActivationFunction } from "./ActivationFunctions";

export class Network {
  // TODO: Implement multiple types of loss functions!

  private layers: Layer[];
  private batchTrained: number = 0;

  constructor(layers: Layer[], public learningRate: number, private batchSize: number = 20, private momentum: number = 0.75, init: boolean = false) {
    // Initialize Layers and their weights
    this.layers = layers;
    if (init) {
      for (let i = 1; i < this.layers.length; i++) {
        this.layers[i].weights = new Matrix(this.layers[i].weights.rows, this.layers[i].weights.cols, this.layers[i].weights.data);
        this.layers[i].neurons = new Matrix(this.layers[i].neurons.rows, this.layers[i].neurons.rows, this.layers[i].neurons.data);
        this.layers[i].biases = new Matrix(this.layers[i].biases.rows, this.layers[i].biases.rows, this.layers[i].biases.data);
        this.layers[i].activationFunction = new ActivationFunction(this.layers[i].activationFunction.activationFunc, this.layers[i].activationFunction.derivFunc, this.layers[i].activationFunction.type);
        this.layers[i].deltaWeightSum = new Matrix(this.layers[i].deltaWeightSum.rows, this.layers[i].deltaWeightSum.cols, this.layers[i].deltaWeightSum.data);
        this.layers[i].deltaBiasSum = new Matrix(this.layers[i].deltaBiasSum.rows, this.layers[i].deltaBiasSum.cols, this.layers[i].deltaBiasSum.data);
      }
    } else {
      // Set all weights from every layer to a random number between -1 and 1
      for (let i = 1; i < this.layers.length; i++) {
        this.layers[i].weights = new Matrix(this.layers[i].nodeCount, this.layers[i - 1].nodeCount)
          .random();
        this.layers[i].previousWeight = new Matrix(this.layers[i].nodeCount, this.layers[i - 1].nodeCount);
        this.layers[i].deltaWeightSum = new Matrix(this.layers[i].nodeCount, this.layers[i - 1].nodeCount);
      }
    }
  }

  train(inputs: number[], outputs: number[]): void {
    // Verify input and output array lengths from the parameters
    if (outputs.length !== this.layers[this.layers.length - 1].nodeCount) throw new Error("Output Length does not match Output layer nodes.");

    // Calculate output error
    let outputError = Matrix.subtract(Matrix.from1DArray(outputs), this.predict(inputs));

    // Create Array to store each error for average loss later
    let errorMatrices: Matrix[] = new Array(this.layers.length);
    errorMatrices[errorMatrices.length - 1] = outputError;

    // Iterate through layers from behind
    for (let i = this.layers.length - 1; i > 0; i--) {
      // Calculate Derivatives Output for Neurons
      let neuronsDerivative = this.layers[i].neurons
          .copy()
          .map(this.layers[i].activationFunction.derivFunc);
      // Gradient calculation => activation'(neurons) * E * lr
      let gradient = Matrix.hadamard(neuronsDerivative, errorMatrices[i])
        .multiply(this.learningRate);

      let deltaW = gradient
        .multiply(Matrix.transpose(this.layers[i - 1].neurons))
        .add(this.layers[i].previousWeight.multiply(this.momentum));

      this.layers[i].deltaWeightSum.add(deltaW);
      this.layers[i].previousWeight = deltaW;



        this.layers[i].deltaBiasSum.add(gradient);

      errorMatrices[i - 1] = Matrix.transpose(this.layers[i].weights).multiply(errorMatrices[i]);
    }

    this.batchTrained++;

    // Adjust weight if batch is finished
    if (this.batchTrained >= this.batchSize) {
      for (let i = this.layers.length - 1; i > 0; i--) {
        // Adjust Weights
        this.layers[i].weights.add(this.layers[i].deltaWeightSum);
        // Adjust Biases
        this.layers[i].biases.add(this.layers[i].deltaBiasSum);


        this.layers[i].deltaWeightSum.map(() => 0);
        this.layers[i].deltaBiasSum.map(() => 0);
      }
      this.batchTrained = 0;
    }




// [input , layer , layer , output]

    }

  predict(inputs: number[]): Matrix {
    // Check if prediction input count matches with the input layer node count
    if (inputs.length !== this.layers[0].nodeCount) throw new Error("Input Length does not match input layer nodes.");

    // Set the input layer neurons to the passed inputs
    this.layers[0].neurons = Matrix.from1DArray(inputs);

    // Feed forward algorithm
    for (let i = 1; i < this.layers.length; i++) {
      this.layers[i].neurons = this.layers[i].weights
        .multiply(this.layers[i - 1].neurons)
        .add(this.layers[i].biases)
        .map(this.layers[i].activationFunction.activationFunc);
    }

    // Return predicted output
    return this.layers[this.layers.length - 1].neurons;
  }

  async save() {
    await fs.writeFileSync("network.json", JSON.stringify(this));
  }

  static async load() {
    let nn = JSON.parse(await fs.readFileSync("network.json", "utf-8"));
    nn.layers.map(layer => {
      switch (layer.activationFunction.type) {
        case Activation.sigmoid:
          layer.activationFunction = ActivationFunction.sigmoid();
          break;
        case Activation.identity:
          layer.activationFunction = ActivationFunction.identity();
          break;
        case Activation.relu:
          layer.activationFunction = ActivationFunction.relu();
          break;
      }
      return layer;
    });
    return new Network(nn.layers, nn.learningRate, nn.batchSize, 0.75,true);
  }
}
