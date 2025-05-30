const path = require('path');
const fs = require('fs');

exports.uploadProfile = async (req, res) => {
  try {
    if (!req.files || !req.files.profile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.profile;
    const allowedTypes = ['image/jpeg', 'image/png'];
    
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Only JPEG and PNG files are allowed' });
    }

    const uploadDir = path.join(__dirname, '../../uploads/profiles');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `profile_${req.user.id}${path.extname(file.name)}`;
    const filePath = path.join(uploadDir, fileName);

    await file.mv(filePath);

    // Update user profile in database
    await User.update({ profileImage: fileName }, { where: { id: req.user.id } });

    res.json({
      success: true,
      filePath: `/uploads/profiles/${fileName}`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadDiagnosis = async (req, res) => {
  try {
    if (!req.files || !req.files.diagnosis) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.diagnosis;
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Only JPEG, PNG and PDF files are allowed' });
    }

    const uploadDir = path.join(__dirname, '../../uploads/diagnoses');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `diagnosis_${Date.now()}${path.extname(file.name)}`;
    const filePath = path.join(uploadDir, fileName);

    await file.mv(filePath);

    res.json({
      success: true,
      filePath: `/uploads/diagnoses/${fileName}`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};