import { Matrix } from "./Matrix";

const m1 = new Matrix(2, 3);
const m2 = new Matrix(3, 1);
m1.random();
m2.random();


console.table(m1.data);
console.table(m2.data);


m1.product(m2).print();


debugger;
