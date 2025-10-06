const ThongTinTuVan = require("../../models/thongtintuvanModel");
const TruongTHPT = require("../../models/truongTHPTModel");
const HoSoTuyenSinh = require("../../models/hosotuyensinhModel");

async function submitInfoAdmission(data) {
  try {
    const { HoTen, SoDienThoai, Email, TrinhDo } = data;

    // ✅ Kiểm tra dữ liệu bắt buộc
    if (!HoTen || !SoDienThoai || !Email || !TrinhDo) {
      throw new Error("Vui lòng điền đầy đủ thông tin");
    }

    // ✅ Kiểm tra email đã tồn tại chưa
    const existedEmail = await ThongTinTuVan.findOne({ Email });
    if (existedEmail) {
      throw new Error("Email đã được sử dụng");
    }

    // ✅ Tạo mới thông tin tư vấn
    const newInfo = new ThongTinTuVan({
      HoTen,
      SoDienThoai,
      Email,
      TrinhDo,
    });

    await newInfo.save();

    return newInfo;
  } catch (err) {
    console.error("❌ Lỗi trong submitInfo:", err.message);
    throw err; // vẫn throw ra để controller xử lý
  }
}

async function submitAdmissionDocument(data) {
  try {
    let truong = await TruongTHPT.findOne({ T_tenTruong: data.Truong12 });

    if (!truong) {
      truong = new TruongTHPT({
        T_tenTruong: data.Truong12,
        T_diaChi: data.Tinh12,
      });
      await truong.save();
    }

    // 2. Tạo hồ sơ tuyển sinh tham chiếu tới trường
    const newAdmission = new HoSoTuyenSinh({
      HoTen: data.HoTen,
      NgaySinh: data.NgaySinh,
      GioiTinh: data.GioiTinh,
      CCCD: data.CCCD,
      NgayCap: data.NgayCap,
      NoiCap: data.NoiCap,
      SoDienThoai: data.SoDienThoai,
      Email: data.Email,
      DiaChi: data.DiaChi,
      TruongTHPT: truong._id, // tham chiếu tới TruongTHPT
      ToHop: data.ToHop,
      Diem1: data.Diem1,
      Diem2: data.Diem2,
      Diem3: data.Diem3,
      AnhThe: data.Photo, // đổi tên field Photo → AnhThe
      HocBa: data.Document, // đổi tên field Document → HocBa
    });

    const saved = await newAdmission.save();
    return saved;
  } catch (err) {
    console.error("Lỗi khi thêm hồ sơ:", err);
    throw err;
  }
}

async function getOneInfoAdmission(cccd) {
    try {
      const admission = await HoSoTuyenSinh.findOne({ CCCD: cccd })
        .populate("TruongTHPT");
  
      return admission;
    } catch (err) {
      console.error("Lỗi khi tìm hồ sơ:", err);
      throw err;
    }
  }

module.exports = {
  submitInfoAdmission,
  submitAdmissionDocument,
  getOneInfoAdmission
};
