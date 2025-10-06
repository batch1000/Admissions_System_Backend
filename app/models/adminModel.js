const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    AD_hoTen: {
      type: String,
      required: true,
      trim: true,
    },
    AD_gioiTinh: {
      type: String,
      enum: ["Nam", "Nữ"],
      required: true,
    },
    AD_ngaySinh: {
      type: Date,
      required: true,
    },
    AD_soDienThoai: {
      type: String,
      required: true,
      trim: true,
    },
    AD_email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    AD_taiKhoan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaiKhoan",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Admin",
  }
);

module.exports = mongoose.model("Admin", AdminSchema);
