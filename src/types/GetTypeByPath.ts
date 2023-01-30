import type { JoinObjectKey } from './JoinObjectKey';
import type { ObjectKeyPaths } from './ObjectKeyPaths';

type GetTypeByPathImpl<
  T,
  KeyPath extends string,
  CurrentPath extends string = ''
> = KeyPath extends `${CurrentPath}${infer Rest}`
  ? Rest extends ''
    ? // return current T if CurrentPath is perfectly matched by KeyPath
      T
    : T extends any[]
    ? number extends T['length']
      ? // case Array
        GetTypeByPathImpl<T[number], KeyPath, `${CurrentPath}[]`>
      : // case Tuple
      T extends [...infer TupleRest, infer U]
      ?
          | GetTypeByPathImpl<
              U,
              KeyPath,
              `${CurrentPath}[${TupleRest['length']}]`
            >
          | GetTypeByPathImpl<TupleRest, KeyPath, CurrentPath>
      : never
    : keyof T extends never
    ? never
    : // case Object
      {
        [K in keyof T]: K extends string
          ? GetTypeByPathImpl<T[K], KeyPath, JoinObjectKey<CurrentPath, K>>
          : never;
      }[keyof T]
  : never;

export type GetTypeByPath<
  T extends object,
  KeyPath extends ObjectKeyPaths<T>
> = GetTypeByPathImpl<T, KeyPath>;
