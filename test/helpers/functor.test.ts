import { expect } from 'chai';
import { Functor } from '../../src/lib/functor';

export const functorLaws = (f: Functor<number>) => {
    it("Should obey first functor law", function () {
        const idMap = f.map(v => v);
        expect(f.equals(idMap)).to.be.true;
    });

    it("Should obey second functor law", function () {
        const fn = (v: number) => 2 * v;
        const gn = (v: number) => 2 + v;
        const comp = (v: number) => fn(gn(v));
        const compMap = f.map(comp);
        const seqMap = f.map(gn).map(fn);
        expect(compMap.equals(seqMap)).to.be.true;
    });
};
