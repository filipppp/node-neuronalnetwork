import { Matrix } from './Matrix';
import { Neuron } from './Neuron';

export class Layer {
  public weights: Matrix[];
  public neurons: Neuron[] = [];

  constructor(
    public nodeCount: number,
    public activationFunction: (num: number | number[]) => number[]
  ) {
    while (nodeCount > 0) {
      this.neurons.push(new Neuron(0));
      this.nodeCount--;
    }
  }





}
