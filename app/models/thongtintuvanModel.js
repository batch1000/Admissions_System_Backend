const mongoose = require("mongoose");

const ThongTinTuVanSchema = new mongoose.Schema(
  {
    HoTen: {
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
      unique: true,
      lowercase: true,
      trim: true,
    },
    TrinhDo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "ThongTinTuVan",
  }
);

module.exports = mongoose.model("ThongTinTuVan", ThongTinTuVanSchema);
