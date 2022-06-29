module.exports = (err, req, res, _next) => {
  const statusByErrorCode = {
    notFound: 404,
    alreadyExists: 409,
  };

  const status = statusByErrorCode[err.code] || 500;

  return res.status(status).json({ message: err.message });
};
