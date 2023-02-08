export type TupleUnionToObject<TupleUnion extends [any, any]> = {
  [Tuple in TupleUnion as Tuple[0]]: Tuple[1];
};
