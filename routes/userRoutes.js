const express = require('express');
const {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} = require('../controller/user.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, getUser);
router.put('/me', authMiddleware, updateUser);
router.delete('/me', authMiddleware, deleteUser);
router.get('/', authMiddleware, getAllUsers);

module.exports = router;
