const Diagnosis = require('../models/diagnosis.model');
const Patient = require('../models/patient.model');
const User = require('../models/user.model');

exports.createDiagnosis = async (req, res) => {
  try {
    const { patientId, title, description } = req.body;
    const file = req.file ? req.file.filename : null;

    const diagnosis = await Diagnosis.create({
      patientId,
      doctorId: req.user.id,
      title,
      description,
      file
    });

    res.status(201).json(diagnosis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDiagnosesByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const diagnoses = await Diagnosis.findAll({
      where: { patientId },
      include: [
        { model: Patient, attributes: ['fullName', 'birthDate'] },
        { model: User, as: 'Doctor', attributes: ['fullName', 'specialization'] }
      ]
    });

    res.json(diagnoses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDiagnosis = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const diagnosis = await Diagnosis.findByPk(id);
    if (!diagnosis) {
      return res.status(404).json({ error: 'Diagnosis not found' });
    }

    diagnosis.title = title || diagnosis.title;
    diagnosis.description = description || diagnosis.description;
    
    await diagnosis.save();

    res.json(diagnosis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDiagnosis = async (req, res) => {
  try {
    const { id } = req.params;

    const diagnosis = await Diagnosis.findByPk(id);
    if (!diagnosis) {
      return res.status(404).json({ error: 'Diagnosis not found' });
    }

    await diagnosis.destroy();
    res.json({ message: 'Diagnosis deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};