function _chaiLuxon(chai, utils) {
  var DateTime;

  if (typeof window === 'object' && typeof window.DateTime == 'function') {
    // browser-side
    DateTime = window.DateTime;
  } else {
    // server-side
    DateTime = require('luxon').DateTime;
  }

  const L = (obj) =>
    typeof obj === 'undefined'
      ? undefined
      : typeof obj === 'string'
      ? DateTime.fromISO(obj)
      : typeof obj === 'number'
      ? DateTime.fromMillis(obj)
      : obj.isLuxonDateTime
      ? obj
      : Object.prototype.toString.call(obj) === '[object Date]'
      ? DateTime.fromJSDate(obj)
      : DateTime.fromObject(obj);

  chai.Assertion.addMethod('sameDate', function (expected) {
    const obj = this._obj;
    const objDateTime = L(obj);
    const expectedDateTime = L(expected);

    const expectedPassMessage = `expected ${objDateTime.toLocaleString()} to be the same date as ${expectedDateTime.toLocaleString()}`;
    const expectedFailMessage = `expected ${objDateTime.toLocaleString()} not to be the same date as ${expectedDateTime.toLocaleString()}`;

    this.assert(objDateTime.hasSame(expectedDateTime, 'day'), expectedPassMessage, expectedFailMessage, expectedDateTime, obj, true);
  });

  chai.Assertion.addMethod('sameDateTime', function (expected, granularity) {
    const obj = this._obj;
    const objDateTime = L(obj);
    const expectedDateTime = L(expected);

    const granularityMessage = granularity ? ` (granularity: ${granularity})` : '';
    const expectedPassMessage = `expected ${objDateTime.toLocaleString()} to be the same as ${expectedDateTime.toLocaleString()}${granularityMessage}`;
    const expectedFailMessage = `expected ${objDateTime.toLocaleString()} not to be the same as ${expectedDateTime.toLocaleString()}${granularityMessage}`;

    this.assert(
      granularity ? objDateTime.hasSame(expectedDateTime, granularity) : objDateTime.equals(expectedDateTime),
      expectedPassMessage,
      expectedFailMessage,
      expectedDateTime,
      obj,
      true
    );
  });

  chai.Assertion.addMethod('beforeDateTime', function (expected, granularity) {
    const obj = this._obj;
    const objDateTime = L(obj);
    const expectedDateTime = L(expected);

    const granularityMessage = granularity ? ` (granularity: ${granularity})` : '';
    const expectedPassMessage = `expected ${objDateTime.toLocaleString()} to be before ${expectedDateTime.toLocaleString()}${granularityMessage}`;
    const expectedFailMessage = `expected ${objDateTime.toLocaleString()} not to be before ${expectedDateTime.toLocaleString()}${granularityMessage}`;

    this.assert(
      granularity ? objDateTime.startOf(granularity) < expectedDateTime.startOf(granularity) : objDateTime < expectedDateTime,
      expectedPassMessage,
      expectedFailMessage,
      expected,
      obj,
      true
    );
  });

  chai.Assertion.addMethod('beforeDate', function (expected) {
    const obj = this._obj;
    const objDateTime = L(obj);
    const expectedDateTime = L(expected);

    const expectedPassMessage = `expected ${objDateTime.toLocaleString()} to have a date before ${expectedDateTime.toLocaleString()}`;
    const expectedFailMessage = `expected ${objDateTime.toLocaleString()} not to have a date before ${expectedDateTime.toLocaleString()}`;

    this.assert(
      objDateTime.startOf('day') < expectedDateTime.startOf('day'),
      expectedPassMessage,
      expectedFailMessage,
      expectedDateTime,
      obj,
      true
    );
  });

  chai.Assertion.addMethod('afterDateTime', function (expected, granularity) {
    const obj = this._obj;
    const objDateTime = L(obj);
    const expectedDateTime = L(expected);

    const granularityMessage = granularity ? ` (granularity: ${granularity})` : '';
    const expectedPassMessage = `expected ${objDateTime.toLocaleString()} to be after ${expectedDateTime.toLocaleString()}${granularityMessage}`;
    const expectedFailMessage = `expected ${objDateTime.toLocaleString()} not to be after ${expectedDateTime.toLocaleString()}${granularityMessage}`;

    this.assert(
      granularity ? objDateTime.startOf(granularity) > expectedDateTime.startOf(granularity) : objDateTime > expectedDateTime,
      expectedPassMessage,
      expectedFailMessage,
      expected,
      obj,
      true
    );
  });

  chai.Assertion.addMethod('afterDate', function (expected) {
    const obj = this._obj;
    const objDateTime = L(obj);
    const expectedDateTime = L(expected);

    const expectedPassMessage = `expected ${objDateTime.toLocaleString()} to have a date after ${expectedDateTime.toLocaleString()}`;
    const expectedFailMessage = `expected ${objDateTime.toLocaleString()} not to have a date after ${expectedDateTime.toLocaleString()}`;

    this.assert(
      objDateTime.startOf('day') > expectedDateTime.startOf('day'),
      expectedPassMessage,
      expectedFailMessage,
      expectedDateTime,
      obj,
      true
    );
  });

  //export tdd style
  const assert = chai.assert;

  const allowedGranularities = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];
  const allowedGranularitiesLookup = allowedGranularities.reduce((acc, cur) => ({ ...acc, ...{ [cur]: true } }), {});

  assert.sameDateTime = (val, exp, granularity, msg) => {
    if (!allowedGranularitiesLookup[granularity]) msg = granularity;
    new chai.Assertion(val, msg).to.be.sameDateTime(exp, granularity);
  };

  assert.sameDate = (val, exp, msg) => {
    new chai.Assertion(val, msg).to.be.sameDate(exp);
  };

  assert.beforeDateTime = (val, exp, granularity, msg) => {
    if (!allowedGranularitiesLookup[granularity]) msg = granularity;
    new chai.Assertion(val, msg).to.be.beforeDateTime(exp, granularity);
  };

  assert.beforeDate = (val, exp, msg) => {
    new chai.Assertion(val, msg).to.be.beforeDate(exp);
  };

  assert.afterDateTime = (val, exp, granularity, msg) => {
    if (!allowedGranularitiesLookup[granularity]) msg = granularity;
    new chai.Assertion(val, msg).to.be.afterDateTime(exp, granularity);
  };

  assert.afterDate = (val, exp, msg) => {
    new chai.Assertion(val, msg).to.be.afterDate(exp);
  };
}

(function (plugin) {
  if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    // NodeJS
    module.exports = plugin;
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(function () {
      return plugin;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(plugin);
  }
})(_chaiLuxon);
