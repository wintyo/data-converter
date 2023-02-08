import type { ObjectKeyValueMap } from '../types/ObjectKeyValueMap';
import type { ChangeTypeByKeyValueSet } from '../types/ChangeTypeByKeyValueSet';
import { joinObjectKey } from './joinObjectKey';

export const convertImpl = (
  obj: any,
  converterSet: Partial<Record<string, (value: any) => any>>,
  currentPath = ''
): any => {
  // no converted obj if currentPath is not included in converterSet
  const filteredMatchedPaths = Object.keys(converterSet).filter((path) =>
    path.startsWith(currentPath)
  );
  if (filteredMatchedPaths.length <= 0) {
    return obj;
  }
  // execute converter if perfectly matched converter at currentPath
  if (filteredMatchedPaths.includes(currentPath)) {
    const converter = converterSet[currentPath];
    return converter ? converter(obj) : obj;
  }

  if (Array.isArray(obj)) {
    const arr = obj;
    // whether nextPath contains array mark
    const isNextArrPath = filteredMatchedPaths.some((path) =>
      path.startsWith(`${currentPath}[]`)
    );
    return arr.map((item, index) => {
      // assign array mark preferentially if includes array mark, and if not then assign tuple mark
      const nextPath = isNextArrPath
        ? `${currentPath}[]`
        : `${currentPath}[${index}]`;
      return convertImpl(item, converterSet, nextPath);
    });
  }

  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    return Object.assign(
      {},
      ...keys.map((key) => ({
        [key]: convertImpl(
          obj[key],
          converterSet,
          joinObjectKey(currentPath, key)
        ),
      }))
    );
  }
  return obj;
};

type GetConverterSet<
  T extends object,
  KeyValueMap extends ObjectKeyValueMap<T> = ObjectKeyValueMap<T>
> = Partial<{
  [K in keyof KeyValueMap]: (value: KeyValueMap[K]) => any;
}>;

type ReturnConvertedType<
  T extends object,
  ConverterSet extends Partial<Record<string, (value: any) => any>>
> = ChangeTypeByKeyValueSet<
  T,
  {
    [K in keyof ConverterSet]: ReturnType<Exclude<ConverterSet[K], undefined>>;
  }
>;

export const convert = <
  T extends object,
  ConverterSet extends GetConverterSet<T>
>(
  obj: T,
  converterSet: ConverterSet
): ReturnConvertedType<T, ConverterSet> => {
  return convertImpl(obj, converterSet);
};
