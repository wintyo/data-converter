import { expectType } from 'tsd-lite';
import type { FilteredObjectKeyPaths } from './FilteredObjectKeyPaths';
import type { StrictEqual } from '~/__utils__/StrictEqual';
import { simpleObj, arrObj, tupleObj } from '~/__mocks__/data';

{
  {
    type Result = FilteredObjectKeyPaths<typeof simpleObj, string>;
    type Expected = 'date';
    expectType<StrictEqual<Result, Expected>>(true);
  }

  {
    type Result = FilteredObjectKeyPaths<typeof simpleObj, number>;
    type Expected = 'num';
    expectType<StrictEqual<Result, Expected>>(true);
  }
}

{
  {
    type Result = FilteredObjectKeyPaths<typeof arrObj, string>;
    type Expected =
      | 'arrDate[]'
      | 'arrObj[].text'
      | 'arrObj[].arrObjDate'
      | 'arrDoubleDate[][]';
    expectType<StrictEqual<Result, Expected>>(true);
  }

  {
    type Result = FilteredObjectKeyPaths<typeof arrObj, string[]>;
    type Expected = 'arrDate' | 'arrDoubleDate[]';
    expectType<StrictEqual<Result, Expected>>(true);
  }
}

{
  {
    type Result = FilteredObjectKeyPaths<typeof tupleObj, string>;
    type Expected =
      | 'tupleDate[0]'
      | 'tupleDate[1]'
      | 'tupleObj[0].text'
      | 'tupleObj[0].tupleObjDate'
      | 'tupleObj[1].tupleObjDate';
    expectType<StrictEqual<Result, Expected>>(true);
  }

  {
    type Result = FilteredObjectKeyPaths<typeof tupleObj, number>;
    type Expected = 'tupleObj[1].num';
    expectType<StrictEqual<Result, Expected>>(true);
  }
}
