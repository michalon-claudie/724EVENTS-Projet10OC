import { getMonth } from '../Date/index';

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    it("should return 'janvier' for the date 2022-01-01", () => {
      const date = new Date("2022-01-01");
      const result = getMonth(date);
      expect(result).toBe("janvier");
    });

    it("should return 'juillet' for the date 2022-07-08", () => {
      const date = new Date("2022-07-08");
      const result = getMonth(date);
      expect(result).toBe("juillet");
    });
  });
});

