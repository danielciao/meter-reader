import moment from 'moment';
import { getDiffInDays, getDaysUntilMonthEnd } from './date-utils';

function interpolateUsage(usage1, usage2) {
  const meterUsage = usage2.cumulative - usage1.cumulative;
  const interval = getDiffInDays(moment(usage2.readingDate), moment(usage1.readingDate));
  const dailyUsage = meterUsage / interval;
  const daysUntilMonth1End = getDaysUntilMonthEnd(moment(usage1.readingDate));

  return {
    beforeMonthEnding: daysUntilMonth1End * dailyUsage,
    afterMonthEnding: (interval - daysUntilMonth1End) * dailyUsage
  };
}

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

function toInterpolatedMonthlyUsage(data = { electricity: [] }) {
  const meterReadings = data.electricity;
  const energyUsageData = [];

  let afterMonthEnding = 0;
  for (let i = 0; i < meterReadings.length - 1; i += 1) {
    const interpolated = interpolateUsage(meterReadings[i], meterReadings[i + 1]);

    energyUsageData.push({
      unit: meterReadings[i].unit,
      date: moment(meterReadings[i].readingDate)
        .endOf('month')
        .toISOString(),
      energyUsage: afterMonthEnding + interpolated.beforeMonthEnding
    });

    // eslint-disable-next-line prefer-destructuring
    afterMonthEnding = interpolated.afterMonthEnding;
  }

  return energyUsageData;
}

export { toMonthlyUsage, toInterpolatedMonthlyUsage };
