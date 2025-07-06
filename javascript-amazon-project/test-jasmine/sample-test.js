import { formatcurrency } from "./formatcurrency.js";

describe('test suite: currency', ()=> {

    it('convert cent to dollars',()=> {
        expect(formatcurrency(2095)).toEqual('20.95')
    });

    it ('check for zero', () => {
        expect(formatcurrency(0)).toEqual('0.00')
    });

    it('check for decimals', () => {
        expect(formatcurrency(2000.5)).toEqual('20.01')
    });


});