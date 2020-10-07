import 'mocha';
import { expect } from 'chai';
import { add, NegativeError } from './main';

describe('String Calculation', () => {
    it('Empty string should return 0', () => {
        const result = add("");
        expect(result).equal(0);
    });
    it('Input 1,2 should return 3', () => {
        const result = add("1,2");
        expect(result).equal(3);
    });
    it('Input 1\\n2,3 should return 6', () => {
        const result = add("1\n2,3");
        expect(result).equal(6);
    });
    it('Input //;\\n1,2;3 should return 6', () => {
        const result = add("//;\n1,2;3");
        expect(result).equal(6);
    });
    it('Input -1,-2 should throw errors', () => {
        try {
            add('-1,-2')
        } catch(e) {
            expect(e.message).equal('Negative values: -1,-2 not allowed');
            return
        }
        throw 'Exception not throw';
    });
    it('Should ignore value larger than 1000', () => {
        expect(add('2,1001')).equal(2);
    });
    it('Input //***\\n1***2***3 should return 6', () => {
        expect(add("//***\n1***2***3")).equal(6);
    });
    it('Input //[*][%]\\n1*2%3 should return 6', () => {
        expect(add("//[*][%]\n1*2%3")).equal(6);
    });
    it('Input //[***][%%%]\\n1***2%%%3 should return 6', () => {
        expect(add("//[***][%%%]\n1***2%%%3")).equal(6);
    });
});