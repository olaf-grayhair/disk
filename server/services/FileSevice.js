const fs = require('fs')
const File = require('../models/File')
const config = require('config')
const path = require('path');
const { resolve } = require('path');

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
    async getFiles(userId, query) {
        const {sort} = query
        let files
        switch (sort) {
            case 'name':
                files = await File.find({user: userId, parent: query.parent}).sort({name:1})
                break
            case 'type':
                files = await File.find({user: userId, parent: query.parent}).sort({type:1})
                break
            case 'date':
                files = await File.find({user: userId, parent: query.parent}).sort({date:1})
                break
            case 'size':
                files = await File.find({user: userId, parent: query.parent}).sort({size:1})
                break
            default:
                files = await File.find({user: userId, parent: query.parent})
        }    

        return files

    }

    uploadFiles(type) {
        type = type.toLowerCase()
        ///image
        if(type === 'jpg' || type === 'jpeg' || type === 'png' || type === 'gif') {
            return 'image'
        }

        ///text
        if(type === 'txt' || type === 'pdf' || type === 'rtf' || type === 'docm' || type === 'docx' || type === 'csv') {
            return 'text'
        }

        ///archive
        if(type === 'zip' || type === 'tgz' || type === 'tar' || type === 'rar' || type === '7z') {
            return 'archive'
        }

        ///media
        if(type === 'mp3' || type === 'ape' || type === 'mp4' || type === 'mkv' || type === 'avi' || type === 'mov' || type === 'flv') {
            return 'media'
        }

    }

    deleteFile(file) {
        const path = this.getPath(file)

        if (file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    renameFile(file, name) {
        const path = this.getPath(file)
        const newPath = config.get('filePath') + '\\' + file.user + '\\' + name 

        fs.renameSync( path, newPath )
    }

    getPath(file) {
        return config.get('filePath') + '\\' + file.user + '\\' + file.path
    }
}


module.exports = new FileService()