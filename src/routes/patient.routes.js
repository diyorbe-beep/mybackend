const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const PatientController = require('../controllers/patient.controller');

// Yangi bemor qo'shish (faqat doktor va admin)
router.post('/', 
  authMiddleware,
  roleMiddleware(['admin', 'doctor']),
  PatientController.createPatient
);

// Barcha bemorlarni ko'rish (doktor, hamshira, admin)
router.get('/', 
  authMiddleware,
  roleMiddleware(['admin', 'doctor', 'nurse']),
  PatientController.getAllPatients
);

// Bemor ma'lumotlarini yangilash
router.put('/:id', 
  authMiddleware,
  roleMiddleware(['admin', 'doctor']),
  PatientController.updatePatient
);

// Bemorni o'chirish (faqat admin)
router.delete('/:id', 
  authMiddleware,
  roleMiddleware(['admin']),
  PatientController.deletePatient
);

module.exports = router;