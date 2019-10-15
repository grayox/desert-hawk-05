// inspired by:
// https://codepen.io/WebSeed/pen/pvgqEq?editors=0010
// https://stackoverflow.com/a/1855903
// http://stackoverflow.com/a/1855903/186965
// rgb to hex: https://stackoverflow.com/a/5624139

// Exports random background color (as bgTextColors.bgHex)
// and foreground text color (as bgTextColors.textHex) optimized for contrast
// Demo: https://codepen.io/WebSeed/pen/pvgqEq?editors=0010

const rgbToHex = ({r, g, b}) => `${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
const componentToHex = c => {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}
const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const out = result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
  return out;
}

const colorIsLight = ({r, g, b}) => {
  // Counting the perceptive luminance
  // human eye favors green color... 
  var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  // console.log(a);
  return (a < 0.5);
}

const colorFromRgb = ({r, g, b,}) => `rgb(${r},${g},${b})`
const randomRgb = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b, };
}

const bgTextColors = hex => {
  let out, bgRgb, bgHex, textHex;
  if(hex) {
    bgHex = hex;
    bgRgb = hexToRgb(bgHex);
    textHex = colorIsLight(bgRgb) ? '000000' : 'FFFFFF';
  } else {
    const randBgRgb = randomRgb();
    bgRgb = colorFromRgb(randBgRgb);
    bgHex = rgbToHex(randBgRgb);
    textHex = colorIsLight(bgRgb) ? '000000' : 'FFFFFF';
  }
  out = { bgRgb, bgHex, textHex, };
  return out;
}

export default bgTextColors