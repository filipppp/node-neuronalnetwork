import { Layer } from "./Layer";

export class Network {
  private layers: Layer[] = [];

  constructor(layers: Layer[]) {
    this.layers = layers;

  }

  train() {

  }

  predict(inputs: number[]) {
    if (inputs.length === this.layers[0].nodeCount) {
      for (let i = 1; i < this.layers.length; i++) {
        this.layers[i].neurons = this.layers[i].weights
          .product(this.layers[i - 1].neurons)
          .add(this.layers[i].biases)
          .map(this.layers[i].activationFunction.activationFunc);
      }
    }
  }

}
