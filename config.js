require('dotenv').config();

module.exports = {
    clockworkApiKey: process.env.E2S_CLOCKWORK_API_KEY,
    email: {
        user: process.env.E2S_EMAIL_USER,
        password: process.env.E2S_EMAIL_PASSWORD,
        host: process.env.E2S_EMAIL_HOST,
        port: process.env.E2S_EMAIL_PORT,
        tls: process.env.E2S_EMAIL_TLS === '1'
    },
    filter: require(process.env.E2S_EMAIL_FILTER_PATH),
    getText: require(process.env.E2S_SMS_TRANSFORM),
    phoneNumber: process.env.E2S_PHONE_NUMBER,
};
