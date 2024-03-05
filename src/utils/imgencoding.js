const fs = require('fs');
const path = require('path');
const { encodeBase64 } = require('./base64utils');

function encodeImageToBase64AndSaveToFile(imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    const fileName = path.basename(imagePath);
    const fileExtension = path.extname(imagePath).slice(1); // slice(1) removes the leading dot

    const base64Data = encodeBase64(imageBuffer);

    // Save Base64 data to a text file
    const txtFilePath = path.join(__dirname, 'base64_data', `${fileName}.txt`);
    fs.writeFileSync(txtFilePath, base64Data, 'utf-8');

    return {
        base64Data,
        fileName,
        fileExtension,
        txtFilePath,
    };
}

module.exports=encodeImageToBase64AndSaveToFile
