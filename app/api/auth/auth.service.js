const bcrypt = require("bcryptjs");
const HocSinh = require("../../models/hocSinhModel");
const TaiKhoan = require("../../models/taiKhoanModel");
const Admin = require("../../models/adminModel");
const CanBoTuyenSinh = require("../../models/canbotuyensinhModel");
const TruongTHPT = require("../../models/truongTHPTModel");

async function generateStudentCode() {
  const lastStudent = await HocSinh.findOne().sort({ createdAt: -1 });
  if (!lastStudent) return "S0001";

  const lastCode = lastStudent.HS_ma; // VD: "S0007"
  const number = parseInt(lastCode.substring(1)) + 1;
  return "S" + number.toString().padStart(4, "0");
}

async function signup(data) {
  try {
    const {
      HoLot,
      Ten,
      NgaySinh,
      Phai,
      DiaChi,
      DienThoai,
      TruongTHPT: tenTruong, // ✅ đổi sang tenTruong
      Email,
      username,
      password,
    } = data;

    // ✅ Kiểm tra username hoặc email đã tồn tại chưa
    const existedUser = await TaiKhoan.findOne({ TK_tenDangNhap: username });
    if (existedUser) throw new Error("Tên đăng nhập đã tồn tại");

    const existedEmail = await HocSinh.findOne({ HS_email: Email });
    if (existedEmail) throw new Error("Email đã tồn tại");

    // ✅ Tạo mã HS mới
    const newCode = await generateStudentCode();

    // ✅ Xử lý Trường THPT
    let truong = await TruongTHPT.findOne({ T_tenTruong: tenTruong });
    if (!truong) {
      truong = new TruongTHPT({ T_tenTruong: tenTruong, T_diaChi: DiaChi });
      await truong.save();
    }

    // ✅ Tạo mới HocSinh (tham chiếu đến TruongTHPT._id)
    const hocSinh = new HocSinh({
      HS_ma: newCode,
      HS_hoTen: `${HoLot} ${Ten}`,
      HS_gioiTinh: Phai,
      HS_ngaySinh: NgaySinh,
      HS_soDienThoai: DienThoai,
      HS_email: Email,
      HS_truongTHPT: truong._id,
    });
    await hocSinh.save();

    // ✅ Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Tạo tài khoản
    const taiKhoan = new TaiKhoan({
      TK_tenDangNhap: username,
      TK_matKhau: hashedPassword,
      TK_vaiTro: "Student",
      HS_id: hocSinh._id,
    });
    await taiKhoan.save();

    return taiKhoan;
    console.log("Đăng ký thành công");
  } catch (err) {
    console.error("❌ Lỗi trong signup:", err.message);
    console.error(err); // log chi tiết stack trace
    throw err; // vẫn throw ra để Express trả về 500
  }
}

async function login(data) {
  const { username, password } = data;

  // ✅ Tìm tài khoản theo tên đăng nhập
  const taiKhoan = await TaiKhoan.findOne({
    TK_tenDangNhap: username,
  });

  if (!taiKhoan) throw new Error("Sai tên đăng nhập hoặc mật khẩu");

  // ✅ So sánh mật khẩu
  const isMatch = await bcrypt.compare(password, taiKhoan.TK_matKhau);
  if (!isMatch) throw new Error("Sai tên đăng nhập hoặc mật khẩu");

  // ✅ Nếu là Admin → tìm trong bảng Admin
  if (taiKhoan.TK_vaiTro === "Admin") {
    const admin = await Admin.findOne({ AD_taiKhoan: taiKhoan._id });
    if (!admin) throw new Error("Không tìm thấy thông tin Admin");

    return {
      _id: admin._id,
      role: taiKhoan.TK_vaiTro,
      hoTen: admin.AD_hoTen,
      email: admin.AD_email,
    };
  }

  // ✅ Nếu là Cán Bộ Tuyển Sinh → tìm trong bảng CanBoTuyenSinh
  if (taiKhoan.TK_vaiTro === "CanBoTuyenSinh") {
    const canBo = await CanBoTuyenSinh.findOne({ CBT_taiKhoan: taiKhoan._id });
    if (!canBo) throw new Error("Không tìm thấy thông tin Cán Bộ Tuyển Sinh");

    return {
      _id: canBo._id,
      role: taiKhoan.TK_vaiTro,
      hoTen: canBo.CBT_hoTen,
      email: canBo.CBT_email,
    };
  }

  throw new Error("Vai trò tài khoản không hợp lệ");
}

module.exports = { login, signup };
