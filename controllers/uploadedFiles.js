const uploadedFilesSchema = require('../models/uploadedFiles');

const uploadFile = async (res, req) => {
    const {USN, pageToPrint, colorPrintPage, copyCount, softBind, bactToback, description} = req.body
    const filePath = req.file.path

    uploadedFilesSchema.create({
        USN,
        pageToPrint,
        colorPrintPage,
        copyCount,
        softBind,
        bactToback,
        description,
        filePath
    })

    res.send({status: true, message: 'file uploaded succesfully'})
}

module.exports = {uploadFile}