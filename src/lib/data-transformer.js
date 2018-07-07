function toMonthlyReading(data) {
  const meterReadings = data.electricity;

  const energyUsageData = [];
  for (let i = 0; i < meterReadings.length - 2; i++) {
    const energyUsage = meterReadings[i + 1].cumulative - meterReadings[i].cumulative;
    energyUsageData.push({
      date: meterReadings[i + 1].readingDate,
      energyUsage,
      unit: meterReadings[i].unit
    });
  }

  return energyUsageData;
}

export { toMonthlyReading };
