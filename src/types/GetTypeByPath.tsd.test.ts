import { expectType } from 'tsd-lite';
import type { StrictEqual } from '../../__utils__/StrictEqual';
import { simpleObj, arrObj, tupleObj } from '../../__mock__/data';
import type { GetTypeByPath } from './GetTypeByPath';

{
  type Result = GetTypeByPath<typeof simpleObj, 'num'>;
  type Expected = number;
  expectType<StrictEqual<Result, Expected>>(true);
}

{
  type Result = GetTypeByPath<typeof arrObj, 'arrDoubleDate[]'>;
  type Expected = string[];
  expectType<StrictEqual<Result, Expected>>(true);
}

{
  type Result = GetTypeByPath<typeof tupleObj, 'tupleObj[0].text'>;
  type Expected = string;
  expectType<StrictEqual<Result, Expected>>(true);
}
