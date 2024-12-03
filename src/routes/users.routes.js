const express = require('express');
const { UserController } = require('../controllers/user.controllers');
const { Auth } = require('../middlewares/auth.middlewares.js');
const router = express.Router();

//get requests
router.get('/own', [Auth], UserController.getCurrentUser);

//post requests
router.post('/signUp', UserController.signUp);
router.post('/login', UserController.login);

module.exports.UserRouter = router;
