function encodeBase64(data) {
    if (!Buffer.isBuffer(data)) {
        throw new Error('Input data must be a binary buffer');
    }

    return data.toString('base64');
}

// Function to decode Base64-encoded data
function decodeBase64(encodedData) {
    if (typeof encodedData !== 'string') {
        throw new Error('Input must be a Base64-encoded string');
    }

    return Buffer.from(encodedData, 'base64').toString('utf-8');
}

module.exports = { encodeBase64, decodeBase64 };