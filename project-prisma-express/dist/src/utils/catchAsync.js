import httpStatus from "http-status";
export const catchAsync = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                statusCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: "failed to register user",
                error: error.message,
            });
        }
    };
};
//# sourceMappingURL=catchAsync.js.map