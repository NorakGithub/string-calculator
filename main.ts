export class NegativeError extends Error {}

export function getDelimiter(numbers: string): string {
    const delimiterRegex = /^(\/\/)(.+)\n/;
    if (delimiterRegex.test(numbers)) {
        const delimiters = numbers.split(delimiterRegex)[2];
        return delimiters.split(/[\[\]]+/).join(',')
    }
    return null;
}

export function add(numbers: string): number {
    if (!numbers || numbers === '') { return 0; }

    const delimiter = getDelimiter(numbers);
    const newNumbers = delimiter !== null ? numbers.substring(3, numbers.length) : numbers;
    const splitRegex = new RegExp('[\n,' + delimiter + ']+');
    const splitted = newNumbers.split(splitRegex);
    const values = splitted.map(value => Number(value)).filter(val => val <= 1000);
    const negativeValues = values.filter(val => val < 0);
    if (negativeValues.length > 0) {
        const msg = 'Negative values: ' + negativeValues.join(',') + ' not allowed';
        throw new NegativeError(msg);
    }
    return values.reduce((a, b) => a + b);
}