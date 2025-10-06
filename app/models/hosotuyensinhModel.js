const mongoose = require("mongoose");

const HoSoTuyenSinhSchema = new mongoose.Schema(
  {
    HoTen: {
      type: String,
      required: true,
      trim: true,
    },
    NgaySinh: {
      type: Date,
      required: true,
    },
    GioiTinh: {
      type: String,
      enum: ["nam", "nu"],
      required: true,
    },
    CCCD: {
      type: String,
      required: true,
      trim: true,
    },
    NgayCap: {
      type: Date,
      required: true,
    },
    NoiCap: {
      type: String,
      required: true,
      trim: true,
    },
    SoDienThoai: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    DiaChi: {
      type: String,
      required: true,
      trim: true,
    },
    TruongTHPT: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TruongTHPT",
      required: true,
    },
    ToHop: {
      type: String,
      required: true,
    },
    Diem1: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    Diem2: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    Diem3: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    AnhThe: {
      type: String, // URL file ảnh
      required: true,
    },
    HocBa: {
      type: String, // URL file PDF
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "HoSoTuyenSinh",
  }
);

module.exports = mongoose.model("HoSoTuyenSinh", HoSoTuyenSinhSchema);
