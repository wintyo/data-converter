import type { PrevNum } from '~/__utils__/PrevNum';
import type { JoinObjectKey } from './JoinObjectKey';

export type ObjectKeyPaths<
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
          | `${CurrentPath}[]`
          | (U extends object
              ? ObjectKeyPaths<U, `${CurrentPath}[]`, PrevNum[SearchableDepth]>
              : never)
      : never
    : // case Tuple
    T extends [...infer Rest, infer U]
    ?
        | `${CurrentPath}[${Rest['length']}]`
        | (U extends object
            ? ObjectKeyPaths<
                U,
                `${CurrentPath}[${Rest['length']}]`,
                PrevNum[SearchableDepth]
              >
            : never)
        | ObjectKeyPaths<Rest, CurrentPath, SearchableDepth>
    : never
  : // case Object
    {
      [K in keyof T]: K extends string
        ?
            | JoinObjectKey<CurrentPath, K>
            | (T[K] extends object
                ? ObjectKeyPaths<
                    T[K],
                    JoinObjectKey<CurrentPath, K>,
                    PrevNum[SearchableDepth]
                  >
                : never)
        : never;
    }[keyof T];
