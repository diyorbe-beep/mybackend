const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const DiagnosisController = require('../controllers/diagnosis.controller');
const upload = require('../middlewares/upload.middleware');

// Yangi tashxis qo'shish
router.post('/',
  authMiddleware,
  roleMiddleware(['doctor', 'admin']),
  upload.single('file'),
  DiagnosisController.createDiagnosis
);

// Bemor bo'yicha tashxislarni olish
router.get('/patient/:patientId',
  authMiddleware,
  roleMiddleware(['doctor', 'nurse', 'admin']),
  DiagnosisController.getDiagnosesByPatient
);

// Tashxisni yangilash
router.put('/:id',
  authMiddleware,
  roleMiddleware(['doctor', 'admin']),
  DiagnosisController.updateDiagnosis
);

// Tashxisni o'chirish
router.delete('/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  DiagnosisController.deleteDiagnosis
);

module.exports = router;