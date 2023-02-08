import { expectType } from 'tsd-lite';
import type { StrictEqual } from '../__utils__/StrictEqual';
import { simpleObj, arrObj, tupleObj } from '../__mocks__/data';
import type { ChangeTypeByKeyValueSet } from './ChangeTypeByKeyValueSet';

{
  type Result = ChangeTypeByKeyValueSet<
    typeof simpleObj,
    {
      date: Date;
    }
  >;
  type Expected = {
    num: number;
    date: Date;
  };
  expectType<StrictEqual<Result, Expected>>(true);
}

{
  type Result = ChangeTypeByKeyValueSet<
    typeof arrObj,
    {
      arrDate: Date[];
      'arrObj[].arrObjDate': Date;
    }
  >;
  type Expected = {
    arrDate: Date[];
    arrObj: Array<{
      text: string;
      arrObjDate: Date;
    }>;
    arrDoubleDate: string[][];
  };
  expectType<StrictEqual<Result, Expected>>(true);
}

{
  type Result = ChangeTypeByKeyValueSet<
    typeof tupleObj,
    {
      'tupleDate[0]': Date;
      'tupleObj[0].tupleObjDate': Date;
      'tupleObj[1].num': string;
    }
  >;
  type Expected = {
    tupleDate: [Date, string];
    tupleObj: [
      {
        text: string;
        tupleObjDate: Date;
      },
      {
        num: string;
        tupleObjDate: string;
      }
    ];
  };
  expectType<StrictEqual<Result, Expected>>(true);
}
