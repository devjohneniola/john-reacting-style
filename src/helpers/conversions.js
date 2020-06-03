export const convertDataSize = (size, afterDecimal = 2) => {
  if (typeof size !== "number") {
    size = Number(size);
    if (isNaN(size)) return "unknown size";
  }

  const convert = divisor => {
    let division = size / divisor;
    if (division - parseInt(division))
      division = division.toFixed(afterDecimal);
    return division;
  };

  let fancySize = "";
  switch (true) {
    case size < 1024:
      fancySize = size + " bytes";
      break;
    case size < 1024 * 1024:
      fancySize = convert(1024) + " kB";
      break;
    case size < 1024 * 1024 * 1024:
      fancySize = convert(1024 * 1024) + " MB";
      break;
    case size < 1024 * 1024 * 1024 * 1024:
      fancySize = convert(1024 * 1024 * 1024) + " GB";
      break;
    case size < 1024 * 1024 * 1024 * 1024 * 1024:
      fancySize = convert(1024 * 1024 * 1024 * 1024) + " TB";
      break;
    default:
      fancySize = "unknown size";
  }
  return fancySize;
};
