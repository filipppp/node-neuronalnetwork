export class Matrix {

  public data: number[][];

  constructor(
    private rows: number,
    private cols: number
  ) {
    // Set all weight values to zero
    this.data = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => 0));
  }

  // Randomize every value of a matrix to a random number ranging from -1 to 1
  random(): Matrix {
    this.map(() => Math.random() * 2 - 1);
    return this;
  }

  add(input: Matrix): Matrix {
    // Check if cols and rows from incoming matrix match with current matrix
    if (input.cols !== this.cols && input.rows !== this.rows) throw new Error("Cols and Rows don't match");
    return this.map((value, row, col) => value + input.data[row][col]);
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
    } /*
    TODO: Implement matrix dot product with arrays (matrix with just one col)
    else {
      if (this.cols === input.length) {
        let result = [];
        for (let i = 0; i < this.rows; i++) {
          let sum = 0;
          for (let j = 0; i < this.cols; j++) {
            sum += this.data[i][j] * input[j];
          }
          result.push(sum);
        }
        return Matrix.from1DArray(result);
      }
    }*/
    return undefined;
  }

  // Map every value
  map(func: (value: number, row: number, col: number) => number): Matrix {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = func(this.data[i][j], i, j);
      }
    }
    return this;
  }

  forEach(func: (value: number, row: number, col: number) => number) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        func(this.data[i][j], i, j);
      }
    }
    return this;
  }

  print() {
    console.table(this.data);
    console.trace();
    return this;
  }

  to1DArray() {
    if (this.cols !== 1) throw new Error("This Matrix can't be converted to a one dimensional Array");
    let arr = [];
    this.forEach(val => arr.push(val));
    return arr;
  }

  static from2DArray(array: any[][]) {
    const mat = new Matrix(array.length, array[0].length);
    mat.data = array;
    return mat;
  }

  static from1DArray(array: any[]) {
    return new Matrix(array.length, 1)
      .map((_, row) => array[row]);
  }

}
