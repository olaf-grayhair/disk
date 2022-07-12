const fs = require('fs')
const file = require('../models/File')
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

    renameFile(file, name, userId) {
        const path = this.getPath(file)
        // const imageDirPath = resolve(__dirname, 'new_img.jpg');
        // console.log(imageDirPath, 'deleteFile');

        // if (file.type === 'dir') {
        //     fs.renameSync( path, config.get('filePath') + '\\' + file.user + '\\' + 'new_dir' )
        // } else {
        //     fs.renameSync( path, config.get('filePath') + '\\' + userId + '\\' + name )
        // }
        
        fs.renameSync( path, config.get('filePath') + '\\' + file.user + '\\' + name )

        console.log(path, 'renameFILE', config.get('filePath') + '\\' + file.user + '\\' + name);
    }//PATH ???

    getPath(file) {
        // const imageDirPath = resolve(__dirname, 'new_img.jpg');
        // console.log(imageDirPath, 'getPath');

        return config.get('filePath') + '\\' + file.user + '\\' + file.path

    }
}


module.exports = new FileService()