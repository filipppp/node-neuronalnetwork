import { Layer } from './Layer';
import { Neuron } from './Neuron';

export class Network {
  private layers: Layer[] = [];

  constructor(layers: Layer[]) {
    this.layers = layers;
    for(let i = 1; i < this.layers.length, i++) {
      for (let j = 0; j < this.layers[i].neurons.length; j++) {
        this.layers[i].weights
        this.layers[i].neurons[j].value =
      }
    }
  }

  train() {

  }

  predict() {
    this.layers[0].neuron.push();
  }

}
