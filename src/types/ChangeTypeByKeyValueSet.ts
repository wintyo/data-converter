import type { PrevNum } from './PrevNum';
import type { JoinObjectKey } from './JoinObjectKey';
import type { ObjectKeyPaths } from './ObjectKeyPaths';

type FilterStartsWith<
  S extends PropertyKey,
  Start extends string
> = S extends `${Start}${infer Rest}` ? S : never;

type ChangeTypeByKeyValueSetImpl<
  T,
  KeyValueSet extends Record<string, any>,
  CurrentPath extends string = '',
  SearchableDepth extends number = 3
> = FilterStartsWith<keyof KeyValueSet, CurrentPath> extends never
  ? // no change type(return current T) if any KeyValueSet doesn't start with CurrentPath
    T
  : CurrentPath extends keyof KeyValueSet
  ? // change matched KeyValueSet if CurrentPath is perfectly matched by any KeyValueSet
    KeyValueSet[CurrentPath]
  : [SearchableDepth] extends [never]
  ? // no change type(return current T) if out of searchable depth count
    T
  : T extends any[]
  ? number extends T['length']
    ? // case Array
      Array<
        ChangeTypeByKeyValueSetImpl<
          T[number],
          KeyValueSet,
          `${CurrentPath}[]`,
          PrevNum[SearchableDepth]
        >
      >
    : // case Tuple
    T extends [...infer Rest, infer U]
    ? [
        ...ChangeTypeByKeyValueSetImpl<
          Rest,
          KeyValueSet,
          CurrentPath,
          SearchableDepth
        >,
        ChangeTypeByKeyValueSetImpl<
          U,
          KeyValueSet,
          `${CurrentPath}[${Rest['length']}]`,
          PrevNum[SearchableDepth]
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
            JoinObjectKey<CurrentPath, K>,
            PrevNum[SearchableDepth]
          >
        : T[K];
    };

export type ChangeTypeByKeyValueSet<
  T extends object,
  KeyValueSet extends Partial<{
    [K in ObjectKeyPaths<T, SearchableDepth>]: any;
  }>,
  SearchableDepth extends number = 3
> =
  // return never type if includes except KeyValueSet because notify unexpected keys
  Exclude<keyof KeyValueSet, ObjectKeyPaths<T>> extends never
    ? ChangeTypeByKeyValueSetImpl<T, KeyValueSet, '', SearchableDepth>
    : never;
