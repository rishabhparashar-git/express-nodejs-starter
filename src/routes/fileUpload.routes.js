const { FileUploadController } = require('../controllers/fileUpload.controller');
const { singleFileUploadMiddleware, multipleFileUploadMiddleware } = require('../middlewares/fileUpload.middlewares');

const router = require('express').Router();

router.post('/single', singleFileUploadMiddleware('file'), FileUploadController.singleFileUpload);
router.post('/multiple', multipleFileUploadMiddleware('files'), FileUploadController.multipleFileUpload);

module.exports.FileUploadRouter = router;
