const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');

const imagesFolder = './images/'; // Replace with the path to the images folder
const outputFolder = './output/'; // Replace with the desired output folder for text

// Create the output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  try {
    fs.mkdirSync(outputFolder);
    console.log('Output folder created successfully.');
  } catch (err) {
    console.error('Error creating output folder:', err);
    return;
  }
}

// Read the images from the images folder
fs.readdir(imagesFolder, (err, files) => {
  if (err) {
    console.error('Error reading images folder:', err);
    return;
  }

  // Process each image
  files.forEach((file, index) => {
    const imagePath = path.join(imagesFolder, file);
    const textPath = path.join(outputFolder, `text${index + 1}.txt`);

    // Perform OCR on the image
    Tesseract.recognize(imagePath, 'eng')
      .then(result => {
        const text = result.data.text;
        try {
          fs.writeFileSync(textPath, text);
          console.log(`Text ${index + 1} saved successfully.`);
        } catch (err) {
          console.error(`Error writing text file for image ${index + 1}:`, err);
        }
      })
      .catch(err => {
        console.error(`Error extracting text from image ${index + 1}:`, err);
      });
  });
});
