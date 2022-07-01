const statusByErrorCode = {
  badRequest: 400,
  notFound: 404,
  alreadyExists: 409,
  unprocessableEntity: 422,
};

const statusByErrorMessage = {
  '"quantity" must be greater than or equal to 1':
    422,
  '"quantity" is required': 400,
  '"productId" is required': 400,
};
  
module.exports = (err, req, res, _next) => {
  if (err.isJoi) {
    let errorMessage = err.details[0].message;
    const errorDetails = err.details[0];
    const path = errorDetails.path[0];

    errorMessage = errorMessage.split(`[${path}].`).join('');

    const statusJoi = statusByErrorMessage[errorMessage];
    return res.status(statusJoi)
      .json({ message: errorMessage });
  }

  const status = statusByErrorCode[err.code] || 500;

  return res.status(status).json({ message: err.message });
};
