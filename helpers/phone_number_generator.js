var _ = require('lodash');

module.exports = {
  // DO NOT USE THIS METHOD, USE METHOD BELOW
  phoneNumber: function() {
    var areaCodes = [[3,0,3], [7,2,0], [7,1,9], [6,4,6], [3,4,7], [9,1,7], [9,1,4],
      [7,1,8], [4,0,8], [4,1,5], [3,1,4], [6,3,6]];
    var x = _.sample(areaCodes);
    var y = [4, 5, 6];
    x.push(_.sample(y));

    while (x.length < 10) {
      x.push(Math.round(Math.random() * 9));
    }
    return x.join('');
  },
  // Method that checks the phone number against the NANP rules via Regex
  isPhoneNumber:function(string){
    return /^1?([2-9]\d\d){2}\d{4}$/.test(string.replace(/\D/g, ''));
},
  allCountryPhoneNumber: function() {
    var validAreaCodes = [
      '303',
      '720',
      '201',
      '202',
      '203',
      '205',
      '212',
      '214',
      '228',
      '248',
      '305',
      '304',
      '307',
      '315',
      '351',
      '409',
      '443',
      '480',
      '502',
      '534',
      '571',
      '616',
      '646',
      '706',
      '707',
      '732',
      '743',
      '762',
      '781',
      '814',
      '832',
      '854'
    ];

    var phone = _.sample(validAreaCodes);
    for (let i = 0; i < 7; i += 1) {
      phone += Math.round(Math.random() * 9).toString();
    }
    if (phone.indexOf('555') !== -1 || !module.exports.isPhoneNumber(phone)) {
      return module.exports.allCountryPhoneNumber();
    }
    return phone;
  }
};
