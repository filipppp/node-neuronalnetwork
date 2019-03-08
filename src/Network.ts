import { Layer } from "./Layer";

export class Network {
  private layers: Layer[] = [];

  constructor(layers: Layer[]) {
    this.layers = layers;

  }

  train() {

  }

  predict() {
    for (let i = 1; i < this.layers.length; i++) {
      for (let j = 0; j < this.layers[i].neurons.length; j++) {
        this.layers[i].weights[j].product(this.layers[i - 1].neurons);
      }
    }
  }

}
