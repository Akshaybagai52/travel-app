// Instead of class, use a factory function
const createAppError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  error.isOperational = true;
  console.log("error: ", error);

  Error.captureStackTrace(error, createAppError);
  return error;
};

module.exports = createAppError;
