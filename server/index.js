// const IP = '109.86.246.84/32'
// const LOGIn = 'coldworld'
// const PASS = 'RG5tdtFCpyMNf6a'
const express = require("express")
const mongoose = require("mongoose")    
require('dotenv').config()
const fileUpload = require("express-fileupload")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")
const app = express()
const PORT = process.env.PORT || 3004
// const corsMiddleware = require('./middleware/cors.middleware')
const cors = require("cors");
const filePathMiddleware = require('./middleware/filepath.middleware')
const path = require('path')

app.use(cors());
app.use(fileUpload({}))
// app.use(corsMiddleware)
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))
app.use(express.json())
app.use(express.static('files'))
app.use(express.static('static'))
app.use('/auth', authRouter)
app.use('/files', fileRouter)



const start = async() => {
    try {
        await mongoose.connect(process.env.DB_NAME)

        app.listen(PORT, () => {
            console.log('server started on port ', PORT);

            // console.log(path.resolve(__dirname, 'files'), 'path');
        })
    } catch (e) {
        console.log(e, 'index error');
    }

}

start()