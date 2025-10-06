const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./app/api/auth/auth.routes"));
app.use("/api/admission", require("./app/api/admission/admission.routes"));

module.exports = app;

// Tạo cán bộ
// const TaiKhoan = require('./app/models/taiKhoanModel');
// const CanBoTuyenSinh = require('./app/models/canbotuyensinhModel');
// const bcrypt = require("bcryptjs");

// (async () => {
//   try {
//     // ✅ Kiểm tra xem tài khoản cán bộ đã tồn tại chưa
//     const existedAccount = await TaiKhoan.findOne({ TK_tenDangNhap: "cbts123" });
//     if (existedAccount) {
//       console.log("⚠️  Tài khoản cbts001 đã tồn tại, không cần tạo lại.");
//       return;
//     }

//     // ✅ Hash mật khẩu
//     const hashedPassword = await bcrypt.hash("cbts123", 10);

//     // ✅ Tạo tài khoản Cán Bộ Tuyển Sinh
//     const taiKhoan = await TaiKhoan.create({
//       TK_tenDangNhap: "cbts123",
//       TK_matKhau: hashedPassword,
//       TK_vaiTro: "CanBoTuyenSinh",
//     });

//     // ✅ Tạo thông tin Cán Bộ Tuyển Sinh, liên kết với tài khoản
//     const canBo = await CanBoTuyenSinh.create({
//       CBT_hoTen: "Trần Tuyển Sinh",
//       CBT_gioiTinh: "Nữ",
//       CBT_ngaySinh: new Date("1992-05-15"),
//       CBT_soDienThoai: "0912345678",
//       CBT_email: "cbts@example.com",
//       CBT_taiKhoan: taiKhoan._id, // Tham chiếu tới tài khoản vừa tạo
//     });

//     console.log("✅ Đã tạo Cán Bộ Tuyển Sinh thành công:");
//     console.log({
//       CBT_hoTen: canBo.CBT_hoTen,
//       TK_tenDangNhap: taiKhoan.TK_tenDangNhap,
//       TK_vaiTro: taiKhoan.TK_vaiTro,
//     });
//   } catch (err) {
//     console.error("❌ Lỗi khi tạo Cán Bộ Tuyển Sinh:", err.message);
//   }
// })();

//Tạo admin
// const TaiKhoan = require('./app/models/taiKhoanModel');
// const Admin = require('./app/models/adminModel');
// const bcrypt = require("bcryptjs");

// (async () => {
//     try {
//       // ✅ Kiểm tra xem tài khoản admin đã tồn tại chưa
//       const existedAccount = await TaiKhoan.findOne({ TK_tenDangNhap: "admin123" });
//       if (existedAccount) {
//         console.log("⚠️  Tài khoản admin123 đã tồn tại, không cần tạo lại.");
//         return;
//       }
  
//       // ✅ Hash mật khẩu
//       const hashedPassword = await bcrypt.hash("admin123", 10);
  
//       // ✅ Tạo tài khoản Admin
//       const taiKhoan = await TaiKhoan.create({
//         TK_tenDangNhap: "admin123",
//         TK_matKhau: hashedPassword,
//         TK_vaiTro: "Admin",
//       });
  
//       // ✅ Tạo thông tin Admin, liên kết với tài khoản
//       const admin = await Admin.create({
//         AD_hoTen: "Nguyễn Quản Trị",
//         AD_gioiTinh: "Nam",
//         AD_ngaySinh: new Date("1990-01-01"),
//         AD_soDienThoai: "0909123456",
//         AD_email: "admin@example.com",
//         AD_taiKhoan: taiKhoan._id, // Tham chiếu tới tài khoản vừa tạo
//       });
  
//       console.log("✅ Đã tạo Admin thành công:");
//       console.log({
//         AD_hoTen: admin.AD_hoTen,
//         TK_tenDangNhap: taiKhoan.TK_tenDangNhap,
//         TK_vaiTro: taiKhoan.TK_vaiTro,
//       });
//     } catch (err) {
//       console.error("❌ Lỗi khi tạo admin:", err.message);
//     }
//   })();