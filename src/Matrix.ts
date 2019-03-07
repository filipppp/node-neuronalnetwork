export class Matrix {

  public data: number[][];

  constructor(
    private rows: number,
    private cols: number
  ) {
    this.data = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => Math.random() * 2 - 1));
    console.table(this.data);
  }


  product(input: Matrix | any[]): Matrix {
    if (input instanceof Matrix) {
      this.map((value, row, col) => value * input.data[row][col]);
    }
    console.log(typeof input);
    let returnValue = [];
    for (let i = 0; i < this.data.length; i++) {
      let temp = [];
      let sum = 0;
      for (let j = 0; i < this.data[i].length; j++) {
        temp.push();
      }
      returnValue.push(temp);
    }
    return Matrix.fromArray(returnValue);
  }

  map(func: (value: number, row: number, col: number) => number): void {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; i < this.data[i].length; j++) {
        this.data[i][j] = func(this.data[i][j], i, j);
      }
    }
  }

  static fromArray(array: any[][]) {
    const mat = new Matrix(array.length, array[0].length);
    mat.data = array;
    return mat;
  }

  set data(value: number[][]) {
    this.data = value;
  }

  get(data)

}
