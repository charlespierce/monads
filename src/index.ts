import { Just, Nothing } from './lib/maybe';
import { Log } from './lib/io';

const invert = (n: number) => n === 0 ? Nothing<number>() : Just(1 / n);
const subtractOne = (n: number) => n - 1;
const two = Just(1);

const result = two.map(subtractOne).bind(invert).map(subtractOne);

const output = Log(result.toString()).bindOver(() => Log("Done!"));
output.execute();
