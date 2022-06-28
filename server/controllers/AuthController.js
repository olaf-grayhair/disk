const AuthService = require('../services/AuthService')

class AuthController {
    async create(req, res) {
        try{
            await AuthService.create(req)
            return res.json({message: 'User was created !!!'})
    
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    async login(req, res) {
        try{
            const user = await AuthService.login(req.body)
            return res.json(user)
        }catch (e) {
            res.status(500).json(e)
        }
    }
    
    async auth(req, res) {
        try{
            const user = await AuthService.auth(req.user.id)
            return res.json(user)
        }catch (e) {
            req.send({message: 'server error !!!'})
        }
    }
}

module.exports =  new AuthController();
