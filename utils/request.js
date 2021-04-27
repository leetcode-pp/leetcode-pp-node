module.exports = {
  success(data) {
    return {
      success: true,
      data,
    };
  },
  fail({ message, code = 10001 }) {
    return {
      success: false,
      data: null,
      message,
      code,
    };
  },
};
