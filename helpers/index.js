const throwError = (code, message) => ({
  error: {
    code,
    message,
  },
});

module.exports = {
  throwError,
};