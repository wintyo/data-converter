import { expectType } from 'tsd-lite';
import { StrictEqual } from '../__utils__/StrictEqual';
import type { TupleUnionToObject } from './TupleUnionToObject';

{
  type Test = ['hoge', string] | ['fuga', number];
  type Result = TupleUnionToObject<Test>;
  type Expected = {
    hoge: string;
    fuga: number;
  };
  expectType<StrictEqual<Result, Expected>>(true);
}
