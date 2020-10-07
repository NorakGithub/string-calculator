export class NegativeError extends Error {}

export function add(numbers: string): number {
    if (!numbers || numbers === '') { return 0; }
    // Test if provided number has custom delimiter
    const hasCustomDelimiter = /^(\/\/)(.+)\n/;
    const delimiter = hasCustomDelimiter.test(numbers) ? numbers.split(hasCustomDelimiter)[2].split(/[\[\]]+/).join(',') : null;
    // Split into array of number values
    const splitRegex = new RegExp('[\n,' + delimiter + ']+');
    const values = numbers.split(splitRegex);
    // Only get value larger than less or equal to 1000
    const validValues = values.map(value => Number(value)).filter(val => val <= 1000);
    // Check if there are value larger than 1000
    const invalidValues = validValues.filter(val => val < 0);
    if (invalidValues.length > 0) {
        throw new NegativeError('Negative values: ' + invalidValues.join(',') + ' not allowed');
    }
    return validValues.reduce((a, b) => a + b);
}