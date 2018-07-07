import moment from 'moment';
import { toMonthlyUsage, toInterpolatedMonthlyUsage } from '../data-transformer';
import { getDiffInDays, getDaysUntilMonthEnd } from '../date-utils';

const TEST_DATA = {
  electricity: [
    {
      cumulative: 17580,
      readingDate: '2017-03-28T00:00:00.000Z',
      unit: 'kWh'
    },
    {
      cumulative: 17759,
      readingDate: '2017-04-15T00:00:00.000Z',
      unit: 'kWh'
    },
    {
      cumulative: 18002,
      readingDate: '2017-05-08T00:00:00.000Z',
      unit: 'kWh'
    }
  ]
};

describe('Data Transformer', () => {
  describe('toMonthlyUsage()', () => {
    it('should return expected properties', () => {
      const { electricity } = TEST_DATA;
      const result = toMonthlyUsage(TEST_DATA);

      expect(result.length).toEqual(2);
      expect(result[0]).toHaveProperty('date', electricity[1].readingDate);
      expect(result[0]).toHaveProperty('energyUsage');
      expect(result[0]).toHaveProperty('unit', electricity[1].unit);
    });

    it('should calculate monthly usage correctly', () => {
      const { electricity } = TEST_DATA;
      const [result1, result2] = toMonthlyUsage(TEST_DATA);

      expect(result1.energyUsage).toEqual(electricity[1].cumulative - electricity[0].cumulative);
      expect(result2.energyUsage).toEqual(electricity[2].cumulative - electricity[1].cumulative);
    });

    it('should handle invalid input', () => {
      const result = toMonthlyUsage();
      expect(result.length).toEqual(0);
    });
  });

  describe('toInterpolatedMonthlyUsage()', () => {
    function manualCalculation(usage1, usage2) {
      const meterUsage = usage2.cumulative - usage1.cumulative;
      const interval = getDiffInDays(moment(usage2.readingDate), moment(usage1.readingDate));
      const dailyUsage = meterUsage / interval;
      const daysToMonth1Ending = getDaysUntilMonthEnd(moment(usage1.readingDate));

      return {
        beforeMonthEnding: daysToMonth1Ending * dailyUsage,
        afterMonthEnding: (interval - daysToMonth1Ending) * dailyUsage
      };
    }

    it('should return expected properties', () => {
      const { electricity } = TEST_DATA;
      const result = toInterpolatedMonthlyUsage(TEST_DATA);

      expect(result.length).toEqual(2);
      expect(result[0]).toHaveProperty(
        'date',
        moment(electricity[0].readingDate)
          .endOf('month')
          .toISOString()
      );
      expect(result[0]).toHaveProperty('energyUsage');
      expect(result[0]).toHaveProperty('unit', electricity[0].unit);

      expect(result[1]).toHaveProperty(
        'date',
        moment(electricity[1].readingDate)
          .endOf('month')
          .toISOString()
      );
    });

    it('should calculate the interpolated monthly usage correctly', () => {
      const { electricity } = TEST_DATA;
      const [result1, result2] = toInterpolatedMonthlyUsage(TEST_DATA);

      const expected1 = manualCalculation(electricity[0], electricity[1]);
      const expected2 = manualCalculation(electricity[1], electricity[2]);

      expect(result1.energyUsage).toEqual(expected1.beforeMonthEnding);
      expect(result2.energyUsage).toEqual(expected1.afterMonthEnding + expected2.beforeMonthEnding);
    });

    it('should handle invalid input', () => {
      const result = toInterpolatedMonthlyUsage();
      expect(result.length).toEqual(0);
    });
  });
});
