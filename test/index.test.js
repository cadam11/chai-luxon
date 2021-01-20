const chai = require('chai');
const chaiLuxon = require('../index.js');

chai.use(chaiLuxon);

const { DateTime } = require('luxon');

chai.should();
const assert = chai.assert;
const expect = chai.expect;

const dateString = '2020-04-21';
const luxonDateTime = DateTime.fromISO(dateString);
const date = luxonDateTime.toJSDate();
const milliseconds = luxonDateTime.toMillis();
const obj = { year: 2020, month: 3, day: 21 };
const oneDayLater = DateTime.fromISO('2020-04-22');
const oneDayBefore = DateTime.fromISO('2020-04-20');
const oneYearLater = DateTime.fromISO('2021-04-21');

const oneHourLater = luxonDateTime.plus({ hour: 1 });

describe('sameDateTime', () => {
  describe('should-style tests', () => {
    it('should pass for type `string`', () => {
      const x = dateString.should.be.sameDateTime(dateString);
    });

    it('should pass for type `date`', () => {
      date.should.be.sameDateTime(date);
    });

    it('should pass for type `milliseconds`', () => {
      milliseconds.should.be.sameDateTime(milliseconds);
    });

    it('should pass for type `obj`', () => {
      obj.should.be.sameDateTime(obj);
    });

    it('should pass for type `DateTime`', () => {
      luxonDateTime.should.be.sameDateTime(luxonDateTime);
    });
  });

  describe('expect-style tests', function () {
    it('should pass for type `string`', () => {
      expect(dateString).to.be.sameDateTime(dateString);
    });

    it('should pass for type `date`', () => {
      expect(date).to.be.sameDateTime(date);
    });

    it('should pass for type `milliseconds`', () => {
      expect(milliseconds).to.be.sameDateTime(milliseconds);
    });

    it('should pass for type `obj`', () => {
      expect(obj).to.be.sameDateTime(obj);
    });

    it('should pass for type `DateTime`', () => {
      expect(luxonDateTime).to.be.sameDateTime(luxonDateTime);
    });
  });

  describe('tdd-style tests', function () {
    it('should pass for type `string`', () => {
      assert.sameDateTime(dateString, dateString);
    });

    it('should pass for type `date`', () => {
      assert.sameDateTime(date, date);
    });

    it('should pass for type `milliseconds`', () => {
      assert.sameDateTime(milliseconds, milliseconds);
    });

    it('should pass for type `obj`', () => {
      assert.sameDateTime(obj, obj);
    });

    it('should pass for type `DateTime`', () => {
      assert.sameDateTime(luxonDateTime, luxonDateTime);
    });
  });

  it('assertion should fail for non-same DateTime', () => {
    assert.throws(() => {
      assert.sameDateTime(luxonDateTime, oneDayLater);
    });
  });

  describe('with granularity', () => {
    it('should-style test should pass', () => {
      date.should.be.sameDateTime(oneDayLater, 'month');
    });

    it('expect-style test should pass', () => {
      expect(date).to.be.sameDateTime(oneDayLater, 'month');
    });

    it('tdd-style test should pass', () => {
      assert.sameDateTime(date, oneDayLater, 'month');
    });

    it('tdd-style with error message in place of granularity should raise error', () => {
      assert.throws(() => {
        assert.sameDateTime(date, oneDayLater, 'DateTimes are not the same');
      }, 'DateTimes are not the same');
    });
  });
});

describe('sameDate', () => {
  describe('should-style tests', () => {
    it('should pass for different time', () => {
      date.should.be.sameDate(oneHourLater);
    });
  });

  describe('expect-style tests', function () {
    it('should pass for different time', () => {
      expect(date).to.be.sameDate(oneHourLater);
    });
  });

  describe('tdd-style tests', function () {
    it('should pass for type `string`', () => {
      assert.sameDate(dateString, oneHourLater);
    });
  });

  it('assertion should fail for non-same Date', () => {
    assert.throws(() => {
      assert.sameDateT(oneDayBefore, oneHourLater);
    });
  });
});

describe('afterDateTime', () => {
  it('should-style test should pass', () => {
    oneDayLater.should.be.afterDateTime(luxonDateTime);
  });

  it('expect-style test should pass', () => {
    expect(oneDayLater).to.be.afterDateTime(luxonDateTime);
  });

  it('tdd-style test should pass', () => {
    assert.afterDateTime(oneDayLater, luxonDateTime);
  });

  it('assertion should fail for non-after DateTime', () => {
    assert.throws(() => {
      assert.afterDateTime(luxonDateTime, oneDayLater);
    });
  });

  describe('with granularity', () => {
    it('should-style test should pass', () => {
      oneYearLater.should.be.afterDateTime(luxonDateTime, 'month');
    });

    it('expect-style test should pass', () => {
      expect(oneYearLater).to.be.afterDateTime(luxonDateTime, 'month');
    });

    it('tdd-style test should pass', () => {
      assert.afterDateTime(oneYearLater, luxonDateTime, 'month');
    });

    it('tdd-style with error message in place of granularity should raise error', () => {
      assert.throws(() => {
        assert.afterDateTime(luxonDateTime, DateTime.fromObject(obj), 'DateTime is not after expected');
      }, 'DateTime is not after expected');
    });
  });
});

describe('afterDate', () => {
  describe('should-style tests', () => {
    it('should pass for different time', () => {
      oneHourLater.should.be.afterDate(oneDayBefore);
    });
  });

  describe('expect-style tests', function () {
    it('should pass for different time', () => {
      expect(oneHourLater).to.be.afterDate(oneDayBefore);
    });
  });

  describe('tdd-style tests', function () {
    it('should pass for type `string`', () => {
      assert.afterDate(oneHourLater, oneDayBefore);
    });
  });

  it('assertion should fail for non-after Date', () => {
    assert.throws(() => {
      assert.afterDate(oneDayBefore, oneHourLater);
    });
  });
});

describe('beforeDateTime', () => {
  it('should-style test should pass', () => {
    oneDayBefore.should.be.beforeDateTime(luxonDateTime);
  });

  it('expect-style test should pass', () => {
    expect(oneDayBefore).to.be.beforeDateTime(luxonDateTime);
  });

  it('tdd-style test should pass', () => {
    assert.beforeDateTime(oneDayBefore, luxonDateTime);
  });

  it('assertion should fail for non-before DateTime', () => {
    assert.throws(() => {
      assert.beforeDateTime(oneYearLater, oneDayLater);
    });
  });

  describe('with granularity', () => {
    it('should-style test should pass', () => {
      luxonDateTime.should.be.beforeDateTime(oneYearLater, 'month');
    });

    it('expect-style test should pass', () => {
      expect(luxonDateTime).to.be.beforeDateTime(oneYearLater, 'month');
    });

    it('tdd-style test should pass', () => {
      assert.beforeDateTime(luxonDateTime, oneYearLater, 'month');
    });

    it('tdd-style with error message in place of granularity should raise error', () => {
      assert.throws(() => {
        assert.beforeDateTime(luxonDateTime, obj, 'DateTime is not before expected');
      }, 'DateTime is not before expected');
    });
  });
});

describe('beforeDate', () => {
  describe('should-style tests', () => {
    it('should pass for different time', () => {
      oneDayBefore.should.be.beforeDate(oneHourLater);
    });
  });

  describe('expect-style tests', function () {
    it('should pass for different time', () => {
      expect(oneDayBefore).to.be.beforeDate(oneHourLater);
    });
  });

  describe('tdd-style tests', function () {
    it('should pass for type `string`', () => {
      assert.beforeDate(oneDayBefore, oneHourLater);
    });
  });

  it('assertion should fail for non-after Date', () => {
    assert.throws(() => {
      assert.beforeDate(oneHourLater, oneDayBefore);
    });
  });
});
