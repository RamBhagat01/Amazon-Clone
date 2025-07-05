import { formatcurrency } from "./formatcurrency.js";

describe('test suite: currency', ()=> {

    it('convert cent to dollars',()=> {
        expect(formatcurrency(2095)).toEqual('20.95')
    })



});