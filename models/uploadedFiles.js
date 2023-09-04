const mongoose = require('mongoose');

const UploadedFilesSchema = new mongoose.Schema({
    USN: {
        type: String,
        trim: true,
        required: true,
    },
    pageToPrint: {
        type: String,
        trim: true,
        required: true,
    },
    colorPrintPage: {
        type: String,
        trim: true,
        required: true,
    },
    copyCount: {
        type: Number,
        trim: true,
        required: true,
    },
    softBind: {
        type: Boolean,
        trim: true,
        required: true,
    },
    bactToback: {
        type: Boolean,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    filePath: {
        type: String,
        trim: true,
        required: true,
    },
})

module.exports = mongoose.model('Uploaded-files', UploadedFilesSchema)