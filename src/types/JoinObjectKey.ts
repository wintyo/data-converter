export type JoinObjectKey<
  CurrentPath extends string,
  AppendKey extends string
> = CurrentPath extends '' ? AppendKey : `${CurrentPath}.${AppendKey}`;
