// @desc    this class is responsible about operation errors (error that i can predict)
class ApiError extends Error{
  constructor(message, statusCode){
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error"; // if request is bad so fail otherwise server error 500
    this.isOperational = true; // help us to know if we handle this error or not 
  }
}

module.exports = ApiError