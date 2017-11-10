const uuid = require('node-uuid');

module.exports = {

  emailAddress: function(firstName = 'auto', lastName = 'e') {
    var sender = firstName.toLowerCase() + lastName.toLowerCase();
    let email = sender + uuid.v4() + '@edify.com';
    winston.log('info', `generated email from sender ${email}`);
    return email;
  }
};
