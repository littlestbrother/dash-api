const createErrorFactory = (statusCode) => (code, message, details = []) => Object.assign(new Error(message), {
    statusCode,
    message,
    code,
    details,
});

const errors = {
    MULTIPLE_CHOICES: createErrorFactory(300),
    BAD_REQUEST: createErrorFactory(400),
    UNAUTHORIZED: createErrorFactory(401),
    PAYMENT_REQUIRED: createErrorFactory(402),
    FORBIDDEN: createErrorFactory(403),
    NOT_FOUND: createErrorFactory(404),
    CONFLICT: createErrorFactory(409),
    BAD_DATA: createErrorFactory(422),
    ILLEGAL: createErrorFactory(451),
    INTERNAL: createErrorFactory(500),
    AM_TEA_POT: createErrorFactory(418),
    CHILL: createErrorFactory(420)
};

module.exports = errors;
