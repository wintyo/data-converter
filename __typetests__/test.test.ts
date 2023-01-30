import { expectType } from 'tsd-lite';
import { StrictEqual } from './utils';

type hoge = string;

expectType<StrictEqual<string, hoge>>(true);

const num: number = 10;
expectType<number>(num);
