module.exports = ({ headers, data }) => {
    return `${headers.get('subject')} ${data.text.splice(0, 10)}`;
};

