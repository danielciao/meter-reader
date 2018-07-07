function toMonthlyUsage(data = { electricity: [] }) {
  const meterReadings = data.electricity;
  const energyUsageData = [];

  for (let i = 0; i < meterReadings.length - 1; i += 1) {
    const { cumulative, readingDate: date, unit } = meterReadings[i + 1];

    energyUsageData.push({
      date,
      unit,
      energyUsage: cumulative - meterReadings[i].cumulative
    });
  }

  return energyUsageData;
}

export { toMonthlyUsage };
