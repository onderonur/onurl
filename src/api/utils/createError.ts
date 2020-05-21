class CustomError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message); // 'Error' breaks prototype chain here
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

// https://github.com/zeit/micro#error-handling
const createError = (statusCode: number, message: string) => {
  const err = new CustomError(statusCode, message);
  return err;
};

export default createError;
