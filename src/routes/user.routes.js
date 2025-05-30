const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const UserController = require('../controllers/user.controller');

// Admin uchun barcha foydalanuvchilarni ko'rish
router.get('/', 
  authMiddleware, 
  roleMiddleware(['admin']), 
  UserController.getAllUsers
);

// Foydalanuvchi ma'lumotlarini yangilash
router.put('/:id', 
  authMiddleware, 
  UserController.updateUser
);

// Foydalanuvchini o'chirish (faqat admin)
router.delete('/:id', 
  authMiddleware, 
  roleMiddleware(['admin']), 
  UserController.deleteUser
);

module.exports = router;