const SPECIAL_PHRASES = {
  $yes: String.fromCodePoint(0x2705),
  $no: String.fromCodePoint(0x274c),
};

const prettyDisplay = (value) => {
  if (SPECIAL_PHRASES[value]) {
    return SPECIAL_PHRASES[value];
  } else {
    return value;
  }
};

export { prettyDisplay };
