function toFormattedDate(date) {
  return new Date(date).toLocaleDateString('en-GB');
}

function toFormattedDecimal(value) {
  return value.toFixed(2);
}

export { toFormattedDate, toFormattedDecimal };
