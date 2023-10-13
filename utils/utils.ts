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

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function isLight(color: string) {
  // Variables for red, green, blue values
  let r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate variables
    const rgb = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/,
    );
    if (!rgb) {
      return "light";
    }

    r = parseInt(rgb[1]);
    g = parseInt(rgb[2]);
    b = parseInt(rgb[3]);
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    const hexColor = hexToRgb(color);
    if (!hexColor) {
      return "light";
    }
    r = hexColor.r;
    g = hexColor.g;
    b = hexColor.b;
  }

  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  return hsp > 127.5;
}

export function getTextColor(color: string) {
  return isLight(color) ? newShade(color, -150) : newShade(color, 150);
}
