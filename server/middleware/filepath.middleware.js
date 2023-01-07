function filePath(path) {
    return function(req, res, next) {
        req.filePath = path
        // console.log(req.filePath, 'cors file');
        next()
    }
}

module.exports = filePath