const fileService = require('../services/FileSevice')
const File = require('../models/File')
const User = require('../models/User')
const sharp = require('sharp');
const fs = require('fs')
const Uuid = require('uuid')
const FileSevice = require('../services/FileSevice')

class FileController {
    async createDir(req, res) {
        console.log(req, 'FileController');
        try {
            const { name, type, parent } = req.body
            const file = new File({ name, type, typeOffile: "dir", parent, user: req.user.id })
            const parentFile = await File.findOne({ _id: parent })
            if (!parentFile) {
                file.path = name
                await fileService.createDir(req, file)

            } else {
                file.path = `${parentFile.path}/${file.name}`
                await fileService.createDir(req, file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (e) {
            return res.status(400).json(e)
        }
    }

    async getFiles(req, res) {
        try {
            const files = await FileSevice.getFiles(req.user.id,
                req.query)
            
            return res.json(files)
        } catch (e) {
            return res.status(500).json({ message: "Can not get files" })
        }
    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file

            const parent = await File.findOne({ user: req.user.id, _id: req.body.parent })
            const user = await User.findOne({ _id: req.user.id })

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({ message: 'There no space on the disk' })
            }

            user.usedSpace = user.usedSpace + file.size

            let path;
            let staticPath;
            if (parent) {
                path = `${req.filePath}/${user._id}/${parent.path}/${file.name}`

                staticPath = `${user._id}/${parent.path}/${file.name}`
            } else {
                path = `${req.filePath}/${user._id}/${file.name}`

                staticPath = `${user._id}/${file.name}`
            }

            if (fs.existsSync(path)) {
                return res.status(400).json({ message: 'File already exist' })
            }
            file.mv(path)

            // const type = file.name.split('.').pop()
            const type = file.name.slice(file.name.lastIndexOf('.') + 1);
            let filePath = file.name

            if (parent) {
                filePath = `${parent.path}/${file.name}`
            }

            const typeOffile = fileService.uploadFiles(type)

            const dbFile = new File({
                name: file.name,
                type,
                typeOffile,
                size: file.size,
                path: filePath,
                parent: parent?._id,
                user: user._id,
                staticPath: staticPath,
            })

            await dbFile.save()
            await user.save()

            res.json(dbFile)
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: "Upload error" })
        }
    }

    async downloadFile(req, res) {
        try {
            const file = await File.findOne({ _id: req.query.id, user: req.user.id })

            const path = fileService.getPath(req, file)
            if (fs.existsSync(path)) {
                return res.download(path, file.name)
            }
            return res.status(400).json({ message: "Download error" })
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async deleteFile(req, res) {
        try {
            const file = await File.findOne({ _id: req.query.id, user: req.user.id })
            const user = await User.findOne({ _id: req.user.id })

            if (!file) {
                return res.status(400).json({ message: 'file not found' })
            }

            user.usedSpace = user.usedSpace - file.size

            fileService.deleteFile(req, file)
            await user.save()
            await file.remove()
            return res.json({ message: 'File was deleted' })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Dir is not empty' })
        }
    }

    async seacrchFile(req, res) {
        try {
            const searchName = req.query.search
            let files = await File.find({ user: req.user.id })
            files = files.filter(file => file.name.includes(searchName))
            return res.json(files)

        } catch (e) {
            return res.status(400).json({ message: 'search error' })
        }
    }

    async seacrchType(req, res) {
        try {
            const searchName = req.query.search
            let files = await File.find({ user: req.user.id })
            files = files.filter(file => file.type.includes(searchName))
            return res.json(files)

        } catch (e) {
            return res.status(400).json({ message: 'search error' })
        }
    }

    async searchAllfiles(req, res) {
        try {
            let files = await File.find({ user: req.user.id })
            return res.json(files)

        } catch (e) {
            return res.status(400).json({ message: 'search error' })
        }
    }

    async uploadAvatar(req, res) {
        try {
            const file = req.files.file
            const user = await User.findById(req.user.id)
            console.log(req.files, 'file');

            const index = file.name.lastIndexOf('.');
            const format = file.name.slice(index + 1)
            const avatarName = Uuid.v4() + '.' + format

            const filePath = `${req.filePath}/${user._id}/${avatarName}`

            try {
                await sharp(file.data)
                .resize({with:200, height:200})
                .toFormat(`jpeg`, { mozjpeg: true }) 
                .toFile(filePath); 
            } catch (error) {
                console.log(error);
            }

            user.avatar = `${user._id}/${avatarName}`
            await user.save()
            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Upload avatar error' })
        }
    }

    async deleteAvatar(req, res) {
        try {
            const user = await User.findById(req.user.id)
            fs.unlinkSync(`${req.filePath}/${user.avatar}`)
            user.avatar = null
            await user.save()
            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Delete avatar error' })
        }
    }

    async rename(req, res) {
        try {
            const {name, id} = req.body
            if (!id) {
                return res.status(400).json({ message: 'no ID' })
            }

            const oldFile = await File.findOne({ _id: id })

            const filename = name + '.' + oldFile.type
            const newPath = oldFile.path.slice(0, oldFile.path.lastIndexOf('/'))
            
            let file = {}

            if(oldFile.parent) {
                file = {
                    _id: id,
                    name: filename,
                    path: `${newPath}/${filename}`,
                    staticPath: `${oldFile.user}/${newPath}/${filename}`,
                }
            }else{
                file = {
                    _id: id,
                    name: filename,
                    path: filename,
                    staticPath: `${oldFile.user}/${filename}`,
                }
            }

            const updateFile = await File.findByIdAndUpdate(file._id, file, { new: true })

            fileService.renameFile(req, oldFile, file.path)

            return res.json(updateFile)
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'rename error' })
        }
    }

    async move(req, res) {
        try {
            const {parent, id} = req.body
            if (!id) {
                return res.status(400).json({ message: 'no ID' })
            }

            const oldFile = await File.findOne({ _id: id })
            const newFile = await File.findOne({ _id: parent })
            
            let file = {}
            
            if(parent) {
                file = {
                    _id: id,
                    parent: parent,
                    path: `${newFile.path}/${oldFile.name}`,
                    staticPath: `${oldFile.user}/${newFile.path}/${oldFile.name}`,
                }
            }else{
                file = {
                    _id: id,
                    parent: null,
                    path: oldFile.name,
                    staticPath: `${oldFile.user}/${oldFile.name}`,
                }
            }

            const updateFile = await File.findByIdAndUpdate(file._id, file, { new: true })

            fileService.renameFile(req, oldFile, file.path)

            return res.json(updateFile)
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'rename error' })
        }
    }

}

module.exports = new FileController()