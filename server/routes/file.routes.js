const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const FileController = require('../controllers/FileController')


router.post('', authMiddleware, FileController.createDir)
router.post('/upload', authMiddleware, FileController.uploadFile)
router.post('/avatar', authMiddleware, FileController.uploadAvatar)
router.get('/download', authMiddleware, FileController.downloadFile)
router.get('/search', authMiddleware, FileController.seacrchFile)
router.get('/type', authMiddleware, FileController.seacrchType)
router.get('/all', authMiddleware, FileController.searchAllfiles)

router.get('', authMiddleware, FileController.getFiles)
router.delete('/', authMiddleware, FileController.deleteFile)
router.delete('/avatar', authMiddleware, FileController.deleteAvatar)

router.put('/', authMiddleware, FileController.rename)
router.put('/move', authMiddleware, FileController.move)


module.exports = router