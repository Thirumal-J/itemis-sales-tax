/**
 * All Utility Functions for the application
 */

class utils {
  /**
   * @description Rounds the given value upto nearest given rounding factor and given decimal digits
   *
   * @param value
   * @param roundingFactor
   * @param decimalDigits
   * @returns Rounded number
   */
  roundUp(
    value: number,
    roundingFactor: number,
    decimalDigits: number
  ): number {
    /**
     * Logic:-
     *  1. Divide "value" by "rouding factor"
     *  2. Ceil the step 1 result - Gives whole number
     *  3. Multiply by "rounding factor"
     */
    return parseFloat(
      (Math.ceil(value / roundingFactor) * roundingFactor).toFixed(
        decimalDigits
      )
    );
  }

  /**
   * @description Rounds the given number with the given decimal digits
   * @param value
   * @param decimalDigits
   * @returns Formatted number with upto given decimal digits
   */
  roundToFixedDecimalDigits(value: number, decimalDigits: number): number {
    return parseFloat(value.toFixed(2));
  }
}

export default new utils();
