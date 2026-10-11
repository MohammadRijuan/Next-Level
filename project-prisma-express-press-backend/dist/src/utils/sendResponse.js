export const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        data: data.data,
        message: data.message,
        meta: data.meta
    });
};
//# sourceMappingURL=sendResponse.js.map