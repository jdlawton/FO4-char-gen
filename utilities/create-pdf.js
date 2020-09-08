const PDFDocument = require('pdfkit');
const fs = require('fs');

const createPDF = function() {

    console.log("TESTING");
    //create a document
    const doc = new PDFDocument;

    //Pipe the output to the dist directory
    doc.pipe(fs.createWriteStream('./public/dist/character.pdf'));

    doc.text(`This is a sample PDF file`);

    doc.end();
}

module.exports = createPDF;