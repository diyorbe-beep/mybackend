const express = require('express');
const router = express.Router();
const { getOverviewStats } = require('../controllers/stats.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.get('/overview', authMiddleware, roleMiddleware(['admin']), getOverviewStats);

module.exports = router;