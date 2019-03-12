import { Network } from "./Network";
import { Layer } from "./Layer";
import { ActivationFunction } from "./ActivationFunctions";

// Test Neural Network
/*
Create Network from Scratch

const nn = new Network([
  new Layer(2, ActivationFunction.sigmoid()),
  new Layer(3, ActivationFunction.sigmoid()),
  new Layer(3, ActivationFunction.sigmoid()),
  new Layer(1, ActivationFunction.sigmoid()),
], 0.2);
*/

run();

async function run() {
  // const nn = await Network.load();
  const nn = new Network([
    new Layer(2, ActivationFunction.sigmoid()),
    new Layer(2, ActivationFunction.sigmoid()),
    new Layer(1, ActivationFunction.sigmoid()),
  ], 0.1, 100);


  for (let i = 0; i < 20000; i++) {
    let random = Math.random();
    if (random < 0.25) {
      nn.train([0, 0], [0]);
    } else if (random > 0.25 && random < 0.5) {
      nn.train([0, 1], [1]);
    } else if (random > 0.5 && random < 0.75) {
      nn.train([1, 0], [1]);
    } else {
      nn.train([1, 1], [0]);
    }
  }

  console.log(nn.predict([0, 0]));
  console.log(nn.predict([0, 1]));
  console.log(nn.predict([1, 0]));
  console.log(nn.predict([1, 1]));

}


/*
Test Save function

doThings();
async function doThings() {
  await nn.save();
  let newNN = await Network.load();
  console.log(newNN.predict([0,1]));
}
 */
debugger;
