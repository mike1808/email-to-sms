const config = require('./config');
const MailListener = require('./MailListener');
const sms = require('./sms');


const mailListener = new MailListener(Object.assign({
    markSeen: true,
}, config.email));

mailListener.start();

mailListener.on('error', console.error.bind(console));

mailListener.on('server:connected', function () {
    console.log('imapConnected');
});

mailListener.on('mail:arrived', function (id) {
    console.log('new mail arrived with id:' + id);
});

mailListener.on('mail:parsed', function (mail) {
    const needSend = config.filter(mail);

    console.log('email parsed with id:', mail.uid);

    if (needSend) {
        console.log('email sending to');
        sms.send({ To: config.phoneNumber, Content: config.getText(mail) })
          .then(() => console.log('SMS is sent!'))
          .catch(console.error.bind(console))
    }
});
