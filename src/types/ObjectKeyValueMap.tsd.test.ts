import { expectType } from 'tsd-lite';
import { simpleObj, arrObj, tupleObj } from '../__mocks__/data';
import { StrictEqual } from '../__utils__/StrictEqual';
import type { ObjectKeyValueMap } from './ObjectKeyValueMap';

{
  type Result = ObjectKeyValueMap<typeof simpleObj>;
  type Expected = {
    num: number;
    date: string;
  };
  expectType<StrictEqual<Result, Expected>>(true);
}

{
  type Result = ObjectKeyValueMap<typeof arrObj>;
  type Expected = {
    arrDate: string[];
    'arrDate[]': string;
    arrObj: {
      text: string;
      arrObjDate: string;
    }[];
    'arrObj[]': {
      text: string;
      arrObjDate: string;
    };
    'arrObj[].text': string;
    'arrObj[].arrObjDate': string;
    arrDoubleDate: string[][];
    'arrDoubleDate[]': string[];
    'arrDoubleDate[][]': string;
  };
  expectType<StrictEqual<Result, Expected>>(true);
}

{
  type Result = ObjectKeyValueMap<typeof tupleObj>;
  type Expected = {
    tupleDate: [string, string];
    'tupleDate[0]': string;
    'tupleDate[1]': string;
    tupleObj: [
      {
        text: string;
        tupleObjDate: string;
      },
      {
        num: number;
        tupleObjDate: string;
      }
    ];
    'tupleObj[0]': {
      text: string;
      tupleObjDate: string;
    };
    'tupleObj[0].text': string;
    'tupleObj[0].tupleObjDate': string;
    'tupleObj[1]': {
      num: number;
      tupleObjDate: string;
    };
    'tupleObj[1].num': number;
    'tupleObj[1].tupleObjDate': string;
  };
  expectType<StrictEqual<Result, Expected>>(true);
}
