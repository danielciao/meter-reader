import { toMonthlyUsage } from '../data-transformer';

const TEST_DATA = {
  electricity: [
    {
      cumulative: 17600,
      readingDate: '2017-03-31T00:00:00.000Z',
      unit: 'kWh'
    },
    {
      cumulative: 17859,
      readingDate: '2017-04-30T00:00:00.000Z',
      unit: 'kWh'
    }
  ]
};

describe('Data Transformer', () => {
  describe('toMonthlyUsage()', () => {
    it('should return expect properties', () => {
      const { electricity } = TEST_DATA;
      const result = toMonthlyUsage(TEST_DATA);

      expect(result.length).toEqual(1);
      expect(result[0]).toHaveProperty('date', electricity[1].readingDate);
      expect(result[0]).toHaveProperty('energyUsage');
      expect(result[0]).toHaveProperty('unit', electricity[1].unit);
    });

    it('should calculate monthly usage correctly', () => {
      const { electricity } = TEST_DATA;
      const [result] = toMonthlyUsage(TEST_DATA);

      expect(result.energyUsage).toEqual(electricity[1].cumulative - electricity[0].cumulative);
    });

    it('should handle invalid input', () => {
      const result = toMonthlyUsage();

      expect(result.length).toEqual(0);
    });
  });
});
