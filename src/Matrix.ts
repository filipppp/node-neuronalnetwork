export class Matrix {

  public data: number[][];

  constructor(
    private rows: number,
    private cols: number
  ) {
  }

  random() {
    this.data = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => Math.random() * 2 - 1));
    return this;
  }


  multiply(input: Matrix): Matrix {
    return this.map((value, row, col) => value * input.data[row][col]);
  }

  product(input: Matrix | any[]): Matrix | undefined {
    if (input instanceof Matrix) {
      if (this.cols === input.rows) {
        return new Matrix(this.rows, input.cols)
          .random()
          .map((_, i, j) => {
            let sum = 0;
            for (let k = 0; k < this.cols; k++) {
              sum += this.data[i][k] * input.data[k][j];
            }
            return sum;
          });
      } else {
        throw new Error("Rows and Columns don't match. Operation not possible");
      }
    } else {
      if (this.cols === input.length) {
        let result = [];
        for (let i = 0; i < this.rows; i++) {
          let sum = 0;
          for (let j = 0; i < this.cols; j++) {
            sum += this.data[i][j] * input[j];
          }
          result.push([sum]);
        }
        return Matrix.fromArray(result);
      }
    }
    return undefined;
  }

  map(func: (value: number, row: number, col: number) => number): Matrix {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = func(this.data[i][j], i, j);
      }
    }
    return this;
  }

  print() {
    console.table(this.data);
  }

  static fromArray(array: any[][]) {
    const mat = new Matrix(array.length, array[0].length);
    mat.data = array;
    return mat;
  }
}
