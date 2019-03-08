import { Matrix } from "./Matrix";

const m1 = new Matrix(2, 3);
const m2 = new Matrix(2, 3);
m1.map(() => 1);
m2.map(() => 3);


m1.print();
m1.add(m2);
m1.print();

/*
console.table(m1.data);
console.table(m2.data);


m1.product(m2).print();
*/

debugger;
