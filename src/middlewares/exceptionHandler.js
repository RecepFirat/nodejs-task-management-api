const exceptionHandler = (error, req, res, next) => {
    let statusCode = 500;
    let status = "fail";
    if (error) {
        statusCode = error.statusCode || 500;
        status = error.status || "fail";
        if (error.isJoi) {
            statusCode = 422;
            status = "content not validated.";
        }
    }
    return res.status(statusCode).json({
        message: error ? error.message : "Internal Server Error",
        status: status
    });
};

module.exports = exceptionHandler;
