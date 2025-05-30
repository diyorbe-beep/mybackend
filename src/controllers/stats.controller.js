const User = require('../models/user.model');
const Patient = require('../models/patient.model');
const Diagnosis = require('../models/diagnosis.model');

exports.getOverviewStats = async (req, res) => {
  try {
    const [users, patients, diagnoses] = await Promise.all([
      User.count(),
      Patient.count(),
      Diagnosis.count(),
    ]);

    const roles = await User.findAll({
      attributes: ['role', [sequelize.fn('COUNT', sequelize.col('role')), 'count']],
      group: ['role'],
    });

    res.json({
      totalUsers: users,
      totalPatients: patients,
      totalDiagnoses: diagnoses,
      usersByRole: roles.map((r) => ({ role: r.role, count: r.get('count') })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};