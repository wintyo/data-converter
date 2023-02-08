import type { FilteredObjectKeyPaths } from '../types/FilteredObjectKeyPaths';
import type { ChangeTypeByKeyValueSet } from '../types/ChangeTypeByKeyValueSet';
import { convertImpl } from './convert';

export const createSpecificConverter = <Converter extends (value: any) => any>(
  converter: Converter
) => {
  return <
    T extends object,
    Keys extends readonly FilteredObjectKeyPaths<T, Parameters<Converter>[0]>[]
  >(
    obj: T,
    keys: Keys
  ): ChangeTypeByKeyValueSet<
    T,
    Record<Keys[number], ReturnType<Converter>>
  > => {
    const converterSet: Record<Keys[number], Converter> = Object.assign(
      {},
      ...keys.map((key) => ({
        [key]: converter,
      }))
    );
    return convertImpl(obj, converterSet);
  };
};
