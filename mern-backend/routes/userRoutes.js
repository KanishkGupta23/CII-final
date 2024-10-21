const express = require('express');
const router = express.Router();
const usersignupController = require('../controllers/usersignupController');
const userloginController = require('../controllers/userloginController');
const userlogoutController = require('../controllers/userlogoutController');
const userpasswordChangeController = require('../controllers/userpasswordChangeController');
const uploadProfilePhotoController = require('../controllers/uploadProfilePhotoController');
const getUserController= require('../controllers/getUserController');



router.post('/signup', usersignupController);
router.post('/login', userloginController);
router.post('/logout', userlogoutController);
router.post('/change-password', userpasswordChangeController);
router.post('/upload-profile-photo', uploadProfilePhotoController);
router.get('/getUser', getUserController);



module.exports = router;