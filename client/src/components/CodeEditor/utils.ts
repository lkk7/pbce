export const debounceRequest = (func: Function, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    const toExecute = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(toExecute, delay);
  };
};

/**
 * Convert a Unicode string to a string made of one-byte characters.
 * Example: input `x→` results in `x\u0092!`
 * This is a modified version (we have to filter out null characters) of a function from MDN.
 * Thanks to: https://developer.mozilla.org/en-US/docs/Web/API/btoa
 */
export const unicodeStrToByteStr = (str: string) => {
  const codeUnits = Uint16Array.from({ length: str.length }, (_, index) =>
    str.charCodeAt(index)
  );
  const charCodes = new Uint8Array(codeUnits.buffer).filter((val) => val !== 0);
  let result = "";
  charCodes.forEach((char) => {
    result += String.fromCharCode(char);
  });
  return result;
};
