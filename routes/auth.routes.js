const express = require('express');
const { signUp, signIn } = require('../controllers/auth.controller');
const { userReqVal } = require('../middlewares/userValidator');
const router = express.Router();

router.post('/signUp', [userReqVal], signUp);
router.post('/signIn', signIn);

module.exports = router