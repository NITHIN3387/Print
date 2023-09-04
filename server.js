const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connection = require('./config/Connection');
const uploadedFile = require('./routers/uploadedFiles');

const app = express()
dotenv.config()

connection()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
}))

app.use(express.json())

app.use('/uploadedFiles', express.static('uploadedFiles'))

app.use('/upload', uploadedFile)


app.listen(process.env.PORT || 4000 , () => {
    console.log(`server started running at the port ${process.env.PORT || 4000}`)
})