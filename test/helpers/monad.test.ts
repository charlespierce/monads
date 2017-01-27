import { expect } from 'chai';
import { Monad } from '../../src/lib/monad';

export const monadLaws = (m: Monad<number>, funcA: (value: number) => Monad<number>, funcB: (value: number) => Monad<number>) => {
    it("Unit -> Bind should be equivalent to executing function", function () {
        let unitBind = m.unit(0).bind(funcA);
        let execute = funcA(0);
        expect(unitBind.equals(execute)).to.be.true;

        unitBind = m.unit(-1).bind(funcA);
        execute = funcA(-1);
        expect(unitBind.equals(execute)).to.be.true;
    });

    it("Binding to unit should not change value", function () {
        const unitBind = m.bind(m.unit);
        expect(unitBind.equals(m)).to.be.true;
    });

    it("Successive binds should be equal to composition", function () {
        const comp = (value: number) => funcA(value).bind(funcB);
        const compBind = m.bind(comp);
        const seqBind = m.bind(funcA).bind(funcB);
        expect(compBind.equals(seqBind)).to.be.true;
    });
};
