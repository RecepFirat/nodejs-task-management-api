class BaseException extends Error {
    constructor(message, statusCode, status) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode || 500;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { BaseException };
