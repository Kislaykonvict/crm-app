const express = require('express');
const { getAllUser, getUserOnId, updateUser } = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middlewares/authValidator');
const router = express.Router();

router.get("/",[verifyToken, isAdmin], getAllUser);
router.get("/:id", [verifyToken, isAdmin], getUserOnId);
router.put("/:id", [verifyToken, isAdmin], updateUser);


module.exports = router;