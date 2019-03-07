import { Layer } from "./Layer";

export class Network {
  private layers: Layer[] = [];

  constructor(layers: Layer[]) {
    this.layers = layers;
    for (let i = 1; i < this.layers.length, i++) {
      for (let j = 0; j < this.layers[i].neurons.length; j++) {
        this.layers[i].weights[j].product(this.layers[i - 1].neurons);
        this.layers[i].neurons[j].value = 2;
      }
    }
  }

  train() {

  }

  predict() {
  }

}
