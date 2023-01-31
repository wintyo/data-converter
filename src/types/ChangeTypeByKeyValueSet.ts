import type { JoinObjectKey } from './JoinObjectKey';
import type { ObjectKeyPaths } from './ObjectKeyPaths';

type FilterStartsWith<
  S extends PropertyKey,
  Start extends string
> = S extends `${Start}${infer Rest}` ? S : never;

type ChangeTypeByKeyValueSetImpl<
  T,
  KeyValueSet extends Record<string, any>,
  CurrentPath extends string = ''
> = FilterStartsWith<keyof KeyValueSet, CurrentPath> extends never
  ? // no change type(return current T) if any KeyValueSet doesn't start with CurrentPath
    T
  : CurrentPath extends keyof KeyValueSet
  ? // change matched KeyValueSet if CurrentPath is perfectly matched by any KeyValueSet
    KeyValueSet[CurrentPath]
  : T extends any[]
  ? number extends T['length']
    ? // case Array
      Array<
        ChangeTypeByKeyValueSetImpl<T[number], KeyValueSet, `${CurrentPath}[]`>
      >
    : // case Tuple
    T extends [...infer Rest, infer U]
    ? [
        ...ChangeTypeByKeyValueSetImpl<Rest, KeyValueSet, CurrentPath>,
        ChangeTypeByKeyValueSetImpl<
          U,
          KeyValueSet,
          `${CurrentPath}[${Rest['length']}]`
        >
      ]
    : T
  : keyof T extends never
  ? T
  : // case Object
    {
      [K in keyof T]: K extends string
        ? ChangeTypeByKeyValueSetImpl<
            T[K],
            KeyValueSet,
            JoinObjectKey<CurrentPath, K>
          >
        : T[K];
    };

export type ChangeTypeByKeyValueSet<
  T extends object,
  KeyValueSet extends Partial<{ [K in ObjectKeyPaths<T>]: any }>
> =
  // return never type if includes except KeyValueSet because notify unexpected keys
  Exclude<keyof KeyValueSet, ObjectKeyPaths<T>> extends never
    ? ChangeTypeByKeyValueSetImpl<T, KeyValueSet>
    : never;
