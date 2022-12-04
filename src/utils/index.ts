class utils {
    roundingToPointZeroFive(value: number) : number {
        value = parseFloat((Math.ceil(value*20)/20).toFixed(2));
        return value;
    }

    round2Decimals(value:number) : number {
        value = parseFloat(value.toFixed(2));
        return value;
    }
}
export default new utils;