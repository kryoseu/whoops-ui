export const validRanges = {
  week: "7d",
  month: "30d",
  quarter: "90d",
  halfYear: "6m",
  year: "1y",
};

export function parseRangeToDays(range) {
  if (!Object.values(validRanges).includes(range)) {
    return 7;
  }

  const match = range.match(/^(\d+)([dmy])$/);

  let value = parseInt(match[1], 10);

  const unit = match[2];
  switch (unit) {
    case "d":
      value *= 1;
      break;
    case "m":
      value *= 30;
      break;
    case "y":
      value *= 365;
      break;
    default:
      value *= 1;
  }

  return value;
}
