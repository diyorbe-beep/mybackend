const Patient = require('../models/patient.model');

exports.createPatient = async (req, res) => {
  try {
    const { fullName, birthDate, gender, address, phone, bloodGroup } = req.body;
    
    const patient = await Patient.create({
      fullName,
      birthDate,
      gender,
      address,
      phone,
      bloodGroup
    });

    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, birthDate, gender, address, phone, bloodGroup } = req.body;
    
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    patient.fullName = fullName || patient.fullName;
    patient.birthDate = birthDate || patient.birthDate;
    patient.gender = gender || patient.gender;
    patient.address = address || patient.address;
    patient.phone = phone || patient.phone;
    patient.bloodGroup = bloodGroup || patient.bloodGroup;
    
    await patient.save();

    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    await patient.destroy();
    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};