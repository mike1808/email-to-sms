const EventEmitter = require('events').EventEmitter;
const MailParser = require('mailparser').MailParser;
const Imap = require('imap');

class MailListener extends EventEmitter {
    constructor(options) {
        super(options);

        this.fetchUnreadOnStart = options.fetchUnreadOnStart;
        this.markSeen = options.markSeen;
        this.imap = new Imap({
            user: options.user,
            password: options.password,
            host: options.host,
            port: options.port,
            tls: options.tls
        });
        this.mailbox = options.mailbox || 'INBOX';
    }

    start() {
        this.imap.once('ready', (err) => {
            if (err) {
                return this.emit('error', err);
            } else {
                this.emit('server:connected');
                return this.imap.openBox(this.mailbox, false, (err) => {
                    if (err) {
                        return this.emit('error', err);
                    } else {
                        if (this.fetchUnreadOnStart) {
                            this._parseUnreadEmails();
                        }
                        return this.imap.on('mail', (id) => {
                            this.emit('mail:arrived', id);
                            return this._parseUnreadEmails();
                        });
                    }
                });
            }
        });
        return this.imap.connect();
    }

    stop() {
        return this.imap.logout(() => {
            return this.emit('server:disconnected');
        });
    }

    _parseUnreadEmails() {
        return this.imap.search(['UNSEEN'], (err, searchResults) => {
            if (err) {
                return this.emit('error', err);
            } else {
                if (Array.isArray(searchResults) && searchResults.length === 0) {
                    return;
                }

                const fetch = this.imap.fetch(searchResults, {
                    bodies: '',
                    markSeen: this.markSeen ? true : undefined,
                });

                return fetch.on('message', (msg, id) => {
                    const parser = new MailParser();
                    const email = {};

                    parser.on('error', (err) => {
                        this.emit('error', err);
                    });

                    parser.on('headers', headers => {
                        email.headers = headers;
                    });

                    parser.on('data', data => {
                        if (data.type === 'text') {
                            email.data = data;
                            email.data.uid = id;
                            this.emit('mail:parsed', email);
                        } else if (data.type === 'attachment') {
                            // TODO handle stream
                            data.release();
                        }
                    });

                    msg.on('body', function (stream, info) {
                        let buffer = '';

                        stream.on('data', function (chunk) {
                            return buffer += chunk;
                        });

                        return stream.once('end', function () {
                            return parser.write(buffer);
                        });
                    });

                    return msg.on('end', function () {
                        return parser.end();
                    });
                });
            }
        });
    };
}

module.exports = MailListener;
