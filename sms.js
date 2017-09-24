const config = require('./config');
const clockwork = require('clockwork')({ key: config.clockworkApiKey });
const { promisify } = require('util');

const sendSms = promisify(clockwork.sendSms.bind(clockwork));

module.exports = {
    send: sendSms,
};
