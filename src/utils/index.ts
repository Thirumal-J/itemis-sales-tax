/**
 * All Utility Functions for the application
 */

class utils {
  /**
   * Function to round the decimal points upto nearest given factor
   * @param value 
   * @param roundingFactor 
   * @param decimalDigits 
   * @returns formatted number
   */
  roundUp(
    value: number,
    roundingFactor: number,
    decimalDigits: number
  ): number {
    /**
     * Logic:-
     *  1. Divide "value" by "factor"
     *  2. Ceil the step 1 result - Gives whole number
     *  3. Multiply by "factor"
     */

    return parseFloat(
      (Math.ceil(value / roundingFactor) * roundingFactor).toFixed(
        decimalDigits
      )
    );
  }

  /**
   * Function to round number with the given decimal digits
   * @param value 
   * @param decimalDigits 
   * @returns formatted number for given decimal digits
   */
  roundToFixedDecimalDigits(value: number, decimalDigits: number): number {
    return parseFloat(value.toFixed(2));
  }
}

export default new utils();
