const mongoose = require('mongoose');

const TruongTHPTSchema = new mongoose.Schema({
  T_tenTruong: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  T_diaChi: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
  collection: 'TruongTHPT'
});

module.exports = mongoose.model('TruongTHPT', TruongTHPTSchema);
