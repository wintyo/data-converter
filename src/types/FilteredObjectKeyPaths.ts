import type { ObjectKeyPaths } from './ObjectKeyPaths';
import type { GetTypeByPath } from './GetTypeByPath';

type FilteredObjectKeyPathsImpl<
  T extends object,
  TargetType,
  KeyPaths extends ObjectKeyPaths<T>
> = {
  [K in KeyPaths]: GetTypeByPath<T, K> extends TargetType ? K : never;
}[KeyPaths];

export type FilteredObjectKeyPaths<
  T extends object,
  TargetType,
  SearchableDepth extends number = 3
> = FilteredObjectKeyPathsImpl<
  T,
  TargetType,
  ObjectKeyPaths<T, '', SearchableDepth>
>;
