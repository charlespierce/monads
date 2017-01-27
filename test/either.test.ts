import { expect } from 'chai';
import { Either } from '../src/lib/either';
import { functorLaws } from './helpers/functor.test';
import { monadLaws } from './helpers/monad.test';

describe("Either monad", function () {
    const inverse = (value: number) => value === 0 ? Either.left<string, number>("No division by zero") : Either.right<string, number>(1 / value);
    const squareRoot = (value: number) => value < 0 ? Either.left<string, number>("No square roots on negative numbers") : Either.right<string, number>(Math.sqrt(value));

    describe("Left side", function () {
        const left = Either.left<string, number>("Error!");

        functorLaws(left);
        monadLaws(left, squareRoot, inverse);
    });

    describe("Right side", function () {
        const right = Either.right<string, number>(10);

        functorLaws(right);
        monadLaws(right, squareRoot, inverse);
    });
});
