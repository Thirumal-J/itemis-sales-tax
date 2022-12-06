class utils {
  roundingToPointZeroFive(value: number): number {
    return parseFloat((Math.ceil(value * 20) / 20).toFixed(2));
  }

  round2Decimals(value: number): number {
    return parseFloat(value.toFixed(2));
  }
}

export default new utils();
