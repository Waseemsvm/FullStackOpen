const info = function (...params) {
    console.log(...params);
};

const error = function (...params) {
    console.error(...params);
};

module.exports = {
    info, error
};