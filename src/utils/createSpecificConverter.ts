import type { FilteredObjectKeyPaths } from '../types/FilteredObjectKeyPaths';
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
