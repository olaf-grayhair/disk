const User = require('../models/User')
const {check, validationResult} = require("express-validator")
const bcrypt = require("bcrypt")//password hashing
const config = require('config')
const jwt = require('jsonwebtoken')
const fileService = require('../services/FileSevice')
const File = require('../models/File')

class AuthController {
    async create(request) {
        // console.log(request, 'req');

        const errors = validationResult(request)
        if(!errors.isEmpty()) {
            throw new Error('Uncorrect request')
        }

        const {email, password} = request.body
        const candidate = await User.findOne({email})
        console.log(candidate, 'ERROR IN SERVICE');
        
        if(candidate) {
            throw new Error(`User with email ${email} already exist`)
        }

        const hashPassword = await bcrypt.hash(password, 8)
        const user = new User({email, password: hashPassword})
        await user.save()
        await fileService.createDir(new File({user:user.id, name: ''}))
    }

    async login(login) {
        const {email, password} = login
        console.log(email, password, 'serv');
        const user = await User.findOne({email})
        if(!user) {
            throw new Error('user not found')
        }

        const isValidpassword = bcrypt.compareSync(password, user.password)

        if(!isValidpassword) {
            throw new Error('ivalid password')
        }

        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
        const userItem = {
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        }
        return userItem
    }
    
    async auth(authUser) {
        const user = await User.findOne({_id:authUser})
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "10h"})
        const userItem = {
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        }
        return userItem
    }
}


module.exports =  new AuthController();
