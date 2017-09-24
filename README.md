# email-to-sms
send SMS messages upon some Emails

## Options

Use environments variables or `.env` file (see `.env.example`):

```
E2S_CLOCKWORK_API_KEY=<API key for clockwork>
E2S_EMAIL_USER=<your email/username>
E2S_EMAIL_PASSWORD=<your email password>
E2S_EMAIL_HOST=<your IMAP server host>
E2S_EMAIL_PORT=<your IMAP server port>
E2S_EMAIL_TLS=<use TLS or not (can be 1 or empty)
E2S_EMAIL_FILTER_PATH=./exampleFilter.js <path to fitering function>
E2S_PHONE_NUMBER=<number to send SMS>
E2S_SMS_TRANSFORM=./exampleSms.js <path to text extraction for SMS from email>
```

## Usage

```bash
$ npm start
```
