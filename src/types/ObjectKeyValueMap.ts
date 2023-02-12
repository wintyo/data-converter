import type { PrevNum } from './PrevNum';
import type { JoinObjectKey } from './JoinObjectKey';
import type { TupleUnionToObject } from './TupleUnionToObject';

type ObjectKeyValueUnion<
  T extends object,
  CurrentPath extends string = '',
  SearchableDepth extends number = 3
> = [SearchableDepth] extends [never]
  ? never
  : T extends any[]
  ? number extends T['length']
    ? // case Array
      T extends (infer U)[]
      ?
          | [`${CurrentPath}[]`, U]
          | (U extends object
              ? ObjectKeyValueUnion<
                  U,
                  `${CurrentPath}[]`,
                  PrevNum[SearchableDepth]
                >
              : never)
      : never
    : // case Tuple
    T extends [...infer Rest, infer U]
    ?
        | [`${CurrentPath}[${Rest['length']}]`, U]
        | (U extends object
            ? ObjectKeyValueUnion<
                U,
                `${CurrentPath}[${Rest['length']}]`,
                PrevNum[SearchableDepth]
              >
            : never)
        | ObjectKeyValueUnion<Rest, CurrentPath, SearchableDepth>
    : never
  : // case Object
    {
      [K in keyof T]: K extends string
        ?
            | [JoinObjectKey<CurrentPath, K>, T[K]]
            | (T[K] extends object
                ? ObjectKeyValueUnion<
                    T[K],
                    JoinObjectKey<CurrentPath, K>,
                    PrevNum[SearchableDepth]
                  >
                : never)
        : never;
    }[keyof T];

export type ObjectKeyValueMap<
  T extends object,
  SearchableDepth extends number = 3
> =
  // decrease 1 depth because this generics type can detect extra depth
  TupleUnionToObject<ObjectKeyValueUnion<T, '', PrevNum[SearchableDepth]>>;
