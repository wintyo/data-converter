import type { PrevNum } from '../__utils__/PrevNum';
import type { JoinObjectKey } from './JoinObjectKey';
import type { ObjectKeyPaths } from './ObjectKeyPaths';

type GetTypeByPathImpl<
  T,
  KeyPath extends string,
  CurrentPath extends string = '',
  SearchableDepth extends number = 3
> = [SearchableDepth] extends [never]
  ? // return never if out of searchable depth count
    never
  : KeyPath extends `${CurrentPath}${infer Rest}`
  ? Rest extends ''
    ? // return current T if CurrentPath is perfectly matched by KeyPath
      T
    : T extends any[]
    ? number extends T['length']
      ? // case Array
        GetTypeByPathImpl<
          T[number],
          KeyPath,
          `${CurrentPath}[]`,
          PrevNum[SearchableDepth]
        >
      : // case Tuple
      T extends [...infer TupleRest, infer U]
      ?
          | GetTypeByPathImpl<
              U,
              KeyPath,
              `${CurrentPath}[${TupleRest['length']}]`,
              PrevNum[SearchableDepth]
            >
          | GetTypeByPathImpl<TupleRest, KeyPath, CurrentPath, SearchableDepth>
      : never
    : keyof T extends never
    ? never
    : // case Object
      {
        [K in keyof T]: K extends string
          ? GetTypeByPathImpl<
              T[K],
              KeyPath,
              JoinObjectKey<CurrentPath, K>,
              PrevNum[SearchableDepth]
            >
          : never;
      }[keyof T]
  : never;

export type GetTypeByPath<
  T extends object,
  KeyPath extends ObjectKeyPaths<T>,
  SearchableDepth extends number = 3
> = GetTypeByPathImpl<T, KeyPath, '', SearchableDepth>;
