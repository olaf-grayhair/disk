// const IP = '109.86.246.84/32'
// const LOGIn = 'coldworld'
// const PASS = 'RG5tdtFCpyMNf6a'
const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const fileUpload = require("express-fileupload")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")
const app = express()
const PORT = config.get('serverPort')
const corsMiddleware = require('./middleware/cors.middleware')

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use(express.static('files'))
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)



const start = async() => {
    try {
        await mongoose.connect(config.get('dbUrl'))

        app.listen(PORT, () => {
            console.log('server started on port ', PORT);
        })
    } catch (e) {
        console.log(e, 'index error');
    }

}

start()