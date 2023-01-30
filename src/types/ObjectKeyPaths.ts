import type { JoinObjectKey } from './JoinObjectKey';

export type ObjectKeyPaths<
  T extends object,
  CurrentPath extends string = ''
> = T extends any[]
  ? number extends T['length']
    ? // case Array
      T extends (infer U)[]
      ?
          | `${CurrentPath}[]`
          | (U extends object ? ObjectKeyPaths<U, `${CurrentPath}[]`> : never)
      : never
    : // case Tuple
    T extends [...infer Rest, infer U]
    ?
        | `${CurrentPath}[${Rest['length']}]`
        | (U extends object
            ? ObjectKeyPaths<U, `${CurrentPath}[${Rest['length']}]`>
            : never)
        | ObjectKeyPaths<Rest, CurrentPath>
    : never
  : // case Object
    {
      [K in keyof T]: K extends string
        ?
            | JoinObjectKey<CurrentPath, K>
            | (T[K] extends object
                ? ObjectKeyPaths<T[K], JoinObjectKey<CurrentPath, K>>
                : never)
        : never;
    }[keyof T];
