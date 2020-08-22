const isValidChar = (char) => {
  const code = char.charCodeAt(0);

  if (
    !(code > 47 && code < 58) && // numeric (0-9)
    !(code > 64 && code < 91) && // upper alpha (A-Z)
    !(code > 96 && code < 123) // lower alpha (a-z)
  )
    return false;

  return true;
};

module.exports = (str) => {
  const mentions = [];

  let chars = str.split(""),
    i = 0,
    found = false,
    curr = "",
    last = null;

  while (i < chars.length) {
    if (chars[i] === "@") {
      found = true;
      last = i;
      i++;
    }

    const char = chars[i];

    if (!!char && !isValidChar(char) && char !== "_") {
      found = false;
    }

    if (found) {
      curr += char;
    } else {
      if (curr.length)
        mentions.push({
          name: curr,
          index: last,
        });

      curr = "";
      last = null;
    }

    i++;
  }

  return mentions;
};
