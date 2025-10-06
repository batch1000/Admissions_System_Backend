const mongoose = require('mongoose');

const TaiKhoanSchema = new mongoose.Schema({
  TK_tenDangNhap: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TK_matKhau: {
    type: String,
    required: true
  },
  TK_vaiTro: {
    type: String,
    enum: ['Student', 'Admin', 'CanBoTuyenSinh'], 
    default: 'Student'
  }
}, {
  timestamps: true,
  collection: 'TaiKhoan'
});

module.exports = mongoose.model('TaiKhoan', TaiKhoanSchema);
