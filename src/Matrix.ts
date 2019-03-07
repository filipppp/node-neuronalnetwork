export class Matrix {

  private data: number[][];

  constructor(
    private rows: number,
    private cols: number
  ) {
    this.data = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => Math.random() * 2 - 1));
    console.table(this.data);
  }
}
