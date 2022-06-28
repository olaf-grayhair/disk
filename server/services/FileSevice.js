const fs = require('fs')
const file = require('../models/File')
const config = require('config')
const path = require('path');

class FileService {
    createDir(file) {
        const filePath = this.getPath(file)
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true })
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: "File already exist"})
                }
            } catch (e) {
                return reject({message: 'File error in Fileservice'})
            }
        }))
    }

    // async getFiles(req) {
    //     const files = await File.find({user: req.user.id, parent: req.query.parent})
    //     return files
    // }

    deleteFile(file) {
        const path = this.getPath(file)
        console.log(path, 'filePath');

        if (file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(file) {
        return config.get('filePath') + '\\' + file.user + '\\' + file.path
    }
}


module.exports = new FileService()