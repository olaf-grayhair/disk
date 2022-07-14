const Router = require('express')
const router = new Router()
const {check, validationResult} = require("express-validator")
const authMiddleware = require('../middleware/auth.middleware')
const AuthController = require('../controllers/AuthController')



router.post('/registration', 
    [
        check('email', 'wrong email').isEmail(),
        check('password', 'Password must be longer than 3 and shorted than 12').isLength({min:3, max:12})
    ],///ВЫНЕСТИ В ОТДЕЛЬНЫЙ ФАЙЛ auth.js
    AuthController.create
)

router.post('/login', AuthController.login)

router.get('/auth', authMiddleware, AuthController.auth)

module.exports = router