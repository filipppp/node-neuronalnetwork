export class Matrix {

  public data: number[][];

  constructor(
    public rows: number,
    public cols: number,
    data?: number[][]
  ) {
      if (data) {
        this.data = data;
      } else {
        // Set all weight values to zero
        this.data = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => 0));
      }
    }

  // Randomize every value of a matrix to a random number ranging from -1 to 1
  random(): Matrix {
    return this.map(() => Math.random() * 2 - 1);
  }

  add(input: Matrix): Matrix {
    // Check if cols and rows from incoming matrix match with current matrix
    if (input.cols !== this.cols && input.rows !== this.rows) throw new Error("Cols and Rows don't match");
    return this.map((value, row, col) => value + input.data[row][col]);
  }

  multiply(input: Matrix | number | any[]): Matrix | undefined {
    if (input instanceof Matrix) {
      if (this.cols !== input.rows) throw new Error("Rows and Columns don't match. Operation not possible");
        return new Matrix(this.rows, input.cols)
          .map((_, i, j) => {
            let sum = 0;
            for (let k = 0; k < this.cols; k++) {
              sum += this.data[i][k] * input.data[k][j];
            }
            return sum;
          });
    } else if (typeof input === "number") {
      return this.copy()
        .map(val => val * input);
    }/*
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


  averageValue(): number {
    let sum = 0;
    this.forEach(val => sum += Math.abs(val));
    return sum / (this.rows * this.cols);
  }

  // Transform every value to something
  map(func: (value: number, row: number, col: number) => number): Matrix {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = func(this.data[i][j], i, j);
      }
    }
    return this;
  }

  forEach(func: (value: number, row: number, col: number) => number): Matrix {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        func(this.data[i][j], i, j);
      }
    }
    return this;
  }

  print(label?: string): Matrix {
    if (label) console.log(label);
    console.table(this.data);
    return this;
  }

  to1DArray(): any[] {
    if (this.cols !== 1) throw new Error("This Matrix can't be converted to a one dimensional Array");
    let arr = [];
    this.forEach(val => arr.push(val));
    return arr;
  }

  copy(): Matrix {
    return new Matrix(this.rows, this.cols)
      .map((_, row, col) => this.data[row][col]);
  }

  static hadamard(m1: Matrix, m2: Matrix) {
    if (m1.rows !== m2.rows || m1.cols !== m2.cols) throw new Error("Rows or Cols don't match up");
    return new Matrix(m1.rows, m1.cols)
      .map((_, row, col) => m1.data[row][col] * m2.data[row][col]);
  }

  static transpose(m: Matrix): Matrix {
    return new Matrix(m.cols, m.rows)
      .map((_, i, j) => m.data[j][i]);
  }

  static subtract(m1: Matrix, m2: Matrix): Matrix {
    // Check if cols and rows from incoming matrix match with current matrix
    if (m1.cols !== m1.cols && m2.rows !== m2.rows) throw new Error("Cols and Rows don't match");
    return new Matrix(m1.rows, m1.cols)
      .map((_, i, j) => m1.data[i][j] - m2.data[i][j]);
  }

  static from2DArray(array: any[][]): Matrix {
    const mat = new Matrix(array.length, array[0].length);
    mat.data = array;
    return mat;
  }

  static from1DArray(array: any[]): Matrix {
    return new Matrix(array.length, 1)
      .map((_, row) => array[row]);
  }

}
