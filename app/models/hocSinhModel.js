const mongoose = require("mongoose");

const HocSinhSchema = new mongoose.Schema(
  {
    HS_ma: {
      type: String,
      required: true,
      unique: true, // Mã học sinh thường là duy nhất
      trim: true,
    },
    HS_hoTen: {
      type: String,
      required: true,
      trim: true,
    },
    HS_gioiTinh: {
      type: String,
      enum: ["Nam", "Nữ"], // chỉ cho phép 2 giá trị
      required: true,
    },
    HS_ngaySinh: {
      type: Date,
      required: true,
    },
    HS_soDienThoai: {
      type: String,
      required: true,
      trim: true,
    },
    HS_email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    HS_truongTHPT: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TruongTHPT",
      required: true,
    },
  },
  {
    timestamps: true, // ✅ Tự động thêm createdAt, updatedAt
    collection: "HocSinh", // ✅ Tên collection trong MongoDB
  }
);

module.exports = mongoose.model("HocSinh", HocSinhSchema);
