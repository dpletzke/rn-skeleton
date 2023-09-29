export function mergeData<T>(
  target: {
    [key: string]: {
      [key: string]: any;
    };
  },
  source: {
    [key: string]: {
      [key: string]: any;
    };
  }
) {
  const result = { ...target };
  Object.keys(source).forEach((key) => {
    if (result[key]) {
      result[key] = { ...result[key], ...source[key] };
    } else {
      result[key] = source[key];
    }
  });
  return result as T;
}
