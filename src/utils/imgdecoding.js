const fs = require('fs').promises;
const path = require('path');

// Base64 utility functions
function decodeBase64(encodedData) {
    return Buffer.from(encodedData, 'base64');
}

// Decoding function
async function decodeBase64AndDisplayImage(txtFilePath) {
    // Read Base64 data from the text file
    const base64Data = await fs.readFile(txtFilePath, 'utf-8');

    // Extract file information from the text file path
    const fileNameWithExtension = path.basename(txtFilePath, '.txt');
    const [fileName, fileExtension] = fileNameWithExtension.split('.');

    // Decode Base64 data
    const decodedBuffer = decodeBase64(base64Data);

    // Save the decoded buffer as an image file
    const decodedImagePath = path.join(__dirname, 'base64_data', `${fileName}.${fileExtension}`);
    await fs.writeFile(decodedImagePath, decodedBuffer);

    // Display the image using the default image viewer
    const open = (await import('open')).default;
    await open(decodedImagePath);

    return decodedImagePath;
}

// Example usage
(async () => {
    const txtFilePath = 'D:/reactexpress/receipe finder/src/utils/base64_data/73529114669.txt';
    const decodedImagePath = await decodeBase64AndDisplayImage(txtFilePath);

    console.log('Decoded Image saved at:', decodedImagePath);
})();
