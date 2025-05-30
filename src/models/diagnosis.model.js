const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Diagnosis = sequelize.define('Diagnosis', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  file: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  }
});

// Modelga aloqalarni qo'shish (keyingi qadamda)
Diagnosis.associate = (models) => {
  Diagnosis.belongsTo(models.Patient, { foreignKey: 'patientId' });
  Diagnosis.belongsTo(models.User, { 
    as: 'Doctor',
    foreignKey: 'doctorId' 
  });
};

module.exports = Diagnosis;