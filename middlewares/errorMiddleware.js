const developmentError = (err, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.isOperational = err.isOperational || false;
  res.status(err.statusCode).json({ err: err, stack: err.stack, message: err.message, status: err.status, isOperational: err.isOperational });
}

const productionError = (err, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({ message: err.message, status: err.status });
}

const globalErrorMiddleware = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    developmentError(err, res);
  } else {
    productionError(err, res);
  }
}

module.exports = globalErrorMiddleware;