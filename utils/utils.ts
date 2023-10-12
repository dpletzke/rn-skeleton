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
  },
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

// function that print the key and the typeof key for a js object
export function printKeys(obj: { [key: string]: any }) {
  Object.keys(obj).forEach((key) => {
    console.log(key, typeof key);
  });
}

export const newShade = (hexColor: string, magnitude: number) => {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
};
