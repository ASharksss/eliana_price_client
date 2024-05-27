export function pluralRusVariant(x) {
  let lastTwoDigits = x % 100;
  let tens = Math.floor(lastTwoDigits / 10);
  if (tens === 1) {
    return 2;
  }
  let ones = lastTwoDigits % 10;
  if (ones === 1) {
    return 0;
  }
  if (ones >= 2 && ones <= 4) {
    return 1;
  }
  return 2;
}