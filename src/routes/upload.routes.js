const express = require('express');
const router = express.Router();
const { uploadProfile, uploadDiagnosis } = require('../controllers/upload.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post('/profile', authMiddleware, uploadProfile);
router.post('/diagnosis', authMiddleware, roleMiddleware(['doctor', 'nurse']), uploadDiagnosis);

module.exports = router;