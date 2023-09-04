const express = require('express');
const multer = require('multer');

const { uploadFile } = require('../controllers/uploadedFiles');

const router = express.Router()

const storage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, './uploadedFiles')
    },
    filename: (res, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({storage})

router.post('/upload-file', upload.single('file'), uploadFile)

module.exports = router