import { simpleObj, tupleObj } from '~/__mocks__/data';

import type { FilteredObjectKeyPaths } from '~/types/FilteredObjectKeyPaths';
import { convert } from './convert';

export const createSpecificConverter = <Converter extends (value: any) => any>(
  converter: Converter
) => {
  return <
    T extends object,
    Keys extends readonly FilteredObjectKeyPaths<T, Parameters<Converter>[0]>[]
  >(
    obj: T,
    keys: Keys
  ) => {
    const converterSet: Record<Keys[number], Converter> = Object.assign(
      {},
      ...keys.map((key) => ({
        [key]: converter,
      }))
    );
    return convert(obj, converterSet);
  };
};

const convertNumber = createSpecificConverter((value: string) => Number(value));

const convertDate = <
  T extends object,
  Keys extends readonly FilteredObjectKeyPaths<T, string>[]
>(
  obj: T,
  keys: Keys
) => {
  const converterSet: Record<Keys[number], (value: string) => Date> =
    Object.assign(
      {},
      ...keys.map((key) => ({
        [key]: (value: string) => new Date(value),
      }))
    );
  return convert(obj, converterSet);
};

const result2 = convertNumber(simpleObj, ['date'] as const);

const result = convertDate(tupleObj, [
  'tupleObj[0].tupleObjDate',
  'tupleDate[0]',
] as const);
