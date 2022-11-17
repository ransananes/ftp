export const isValid = (function () {
    var rg1 = /^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
    var rg2 = /^\./; // cannot start with dot (.)
    var rg3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
    return function isValid(fname) {
      return rg1.test(fname) && !rg2.test(fname) && !rg3.test(fname);
    };
  })();