const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {//cors
    if (req.method === 'OPTIONS') {
       return next()
    }

    console.log(req.body, 'midl');
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Auth error'})
        }

        
        const decoded = jwt.verify(token, config.get('secretKey'))
        // console.log(req, 'decoded');
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({message: 'Auth error'})
    }
}