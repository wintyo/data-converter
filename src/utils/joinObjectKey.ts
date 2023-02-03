export const joinObjectKey = (currentPath: string, key: string) => {
  return currentPath === '' ? key : `${currentPath}.${key}`;
};
