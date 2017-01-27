import { expect } from 'chai';
import { Maybe } from '../src/lib/maybe';
import { functorLaws } from './helpers/functor.test';
import { monadLaws } from './helpers/monad.test';

describe("Maybe monad", function () {
    const inverse = (value: number) => value === 0 ? Maybe.nothing() : Maybe.just(1 / value);
    const squareRoot = (value: number) => value < 0 ? Maybe.nothing() : Maybe.just(Math.sqrt(value));

    describe("Nothing side", function () {
        const nothing = Maybe.nothing();

        functorLaws(nothing);
        monadLaws(nothing, squareRoot, inverse);
    });

    describe("Just side", function () {
        const just = Maybe.just(10);

        functorLaws(just);
        monadLaws(just, squareRoot, inverse);
    });
});
