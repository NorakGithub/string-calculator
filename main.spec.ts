import 'mocha';
import { expect } from 'chai';
import { add, NegativeError } from './main';

describe('String Calculation', () => {
    it('1. Empty string should return 0', () => {
        const result = add("");
        expect(result).equal(0);
    });
    it('2. 1,2 should return 3', () => {
        const result = add("1,2");
        expect(result).equal(3);
    });
    it('3. 1\\n2,3 should return 6', () => {
        const result = add("1\n2,3");
        expect(result).equal(6);
    });
    it('Should print 15 when provide //\n\n5\n5\n5', () => {
        expect(add('//\n\n5\n5\n5')).equal(15);
    });
    it('4. //;\\n1,2;3 should return 6', () => {
        const result = add("//;\n1,2;3");
        expect(result).equal(6);
    });
    it('5. -1,-2 should throw errors', () => {
        try {
            add('-1,-2')
        } catch(e) {
            expect(e.message).equal('Negative values: -1,-2 not allowed');
            return
        }
        throw 'Exception not throw';
    });
    it('6. gnore value larger than 1000', () => {
        expect(add('2,1001')).equal(2);
    });
    it('7. //***\\n1***2***3 should return 6', () => {
        expect(add("//***\n1***2***3")).equal(6);
    });
    it('8. //[*][%]\\n1*2%3 should return 6', () => {
        expect(add("//[*][%]\n1*2%3")).equal(6);
    });
    it('9. //[***][%%%]\\n1***2%%%3 should return 6', () => {
        expect(add("//[***][%%%]\n1***2%%%3")).equal(6);
    });
});