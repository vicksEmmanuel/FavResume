var pdf = require('html-pdf');
var htmlDocx = require('html-docx-js');
const fs = require('fs');

class Document {
    static convertToWord(html, filename, callbackSuccess, callbackError) {
        var docx = htmlDocx.asBlob(html);
        fs.mkdir(`./public/${filename.substr(0,filename.lastIndexOf('/'))}`, { recursive: true }, async (err) => {
            if (err) {
                console.log(err);
                return callbackError(err);
            }
            console.log('we are here')
            await fs.writeFile(`./public/${filename}.docx`, docx, err => {
                if (err) {
                    console.log(err);
                    return callbackError(err);
                }
                return callbackSuccess();
            });
        });
    }
    static convertToPdf(html, filename, callbackSuccess, callbackError) {
        //setting options for PDF
        var options = { format: 'A4', timeout: '100000' };
        pdf.create(html, options).toFile(`./public/${filename}.pdf`, function (err, resp) {
            if(resp) return callbackSuccess();
             if (err) return callbackError(err);
        });
    }
    static checkTypeOfDocumentAndCreate (doc, html, filename, callbackSuccess, callbackError) {
        switch(doc) {
            case "pdf":
                this.convertToPdf(html,filename,callbackSuccess,callbackError);
                return;
            case "docx":
                this.convertToWord(html,filename,callbackSuccess,callbackError);
                return;
            default:
                this.convertToPdf(html,filename,callbackSuccess,callbackError);
        }
    }
}

module.exports = Document;