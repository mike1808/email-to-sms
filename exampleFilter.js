module.exports = ({ headers, data }) => {
    // headers https://nodemailer.com/extras/mailparser/#headers-map
    // data https://nodemailer.com/extras/mailparser/#text-object
    // return /no-reply/.test(headers.get('from')) && /event/.test(data.text);
    // return /no-reply/.test(headers.get('from')) && /event/.test(data.text);
    return /event/.test(data.text);
};

