import { Network } from "./Network";
import { Layer } from "./Layer";
import { ActivationFunction } from "./ActivationFunctions";

// Test Neural Network

const nn = new Network([
  new Layer(2, ActivationFunction.relu()),
  new Layer(3, ActivationFunction.sigmoid()),
  new Layer(3, ActivationFunction.relu()),
  new Layer(2, ActivationFunction.sigmoid()),
]);

console.log(nn.predict([4, 5]));


debugger;
