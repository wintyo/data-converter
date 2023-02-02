import { expectType } from 'tsd-lite';
import type { ObjectKeyPaths } from './ObjectKeyPaths';
import { StrictEqual } from '~/__utils__/StrictEqual';
import { simpleObj, arrObj, tupleObj } from '~/__mocks__/data';

{
  type Result = ObjectKeyPaths<typeof simpleObj>;
  type Expected = 'num' | 'date';
  expectType<StrictEqual<Result, Expected>>(true);
}

{
  type Result = ObjectKeyPaths<typeof arrObj>;
  type Expected =
    | 'arrDate'
    | 'arrDate[]'
    | 'arrObj'
    | 'arrObj[]'
    | 'arrObj[].text'
    | 'arrObj[].arrObjDate'
    | 'arrDoubleDate'
    | 'arrDoubleDate[]'
    | 'arrDoubleDate[][]';
  expectType<StrictEqual<Result, Expected>>(true);
}

{
  type Result = ObjectKeyPaths<typeof tupleObj>;
  type Expected =
    | 'tupleDate'
    | 'tupleDate[0]'
    | 'tupleDate[1]'
    | 'tupleObj'
    | 'tupleObj[0]'
    | 'tupleObj[0].text'
    | 'tupleObj[0].tupleObjDate'
    | 'tupleObj[1]'
    | 'tupleObj[1].num'
    | 'tupleObj[1].tupleObjDate';
  expectType<StrictEqual<Result, Expected>>(true);
}
