const mongoose = require("mongoose");

const CanBoTuyenSinhSchema = new mongoose.Schema(
  {
    CBT_hoTen: {
      type: String,
      required: true,
      trim: true,
    },
    CBT_gioiTinh: {
      type: String,
      enum: ["Nam", "Nữ"],
      required: true,
    },
    CBT_ngaySinh: {
      type: Date,
      required: true,
    },
    CBT_soDienThoai: {
      type: String,
      required: true,
      trim: true,
    },
    CBT_email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    CBT_taiKhoan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaiKhoan",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "CanBoTuyenSinh",
  }
);

module.exports = mongoose.model("CanBoTuyenSinh", CanBoTuyenSinhSchema);
