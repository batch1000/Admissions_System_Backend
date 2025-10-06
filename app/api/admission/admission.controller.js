const admissionService = require("./admission.service");
const {
  uploadToCloudinary,
  deleteImageFromCloudinary,
} = require("../../services/cloudinary.service");

async function submitInfoAdmission(req, res) {
  try {
    const result = await admissionService.submitInfoAdmission(req.body);
    res.json(result);
    console.log("Gửi thông tin tư vấn thành công: ", result._id);
  } catch (error) {
    console.error("❌ Lỗi submitInfoAdmission:", error.message);
    res.status(500).send("Gửi thông tin tư vấn thất bại");
  }
}

async function submitAdmissionDocument(req, res) {
  try {
    const body = req.body;
    const files = req.files;

    const photoFile = files && files.photo ? files.photo[0] : null;
    const documentFile = files && files.document ? files.document[0] : null;

    if (!photoFile || !documentFile) {
      return res.status(400).send("Vui lòng upload đầy đủ ảnh thẻ và file PDF");
    }

    // Upload ảnh
    const photoUpload = await uploadToCloudinary(photoFile.buffer);
    if (!photoUpload) {
      console.error("Lỗi upload ảnh");
      return res.status(500).send("Không thể upload ảnh");
    }
    const photoUrl = photoUpload.secure_url;

    // Upload PDF
    const docUpload = await uploadToCloudinary(documentFile.buffer);
    if (!docUpload) {
      console.error("Lỗi upload PDF");
      return res.status(500).send("Không thể upload PDF");
    }
    const docUrl = docUpload.secure_url;

    // Chuẩn bị dữ liệu lưu DB
    const admissionData = {
      HoTen: body.name,
      SoDienThoai: body.phone,
      Email: body.email,
      NgaySinh: body.birthdate,
      GioiTinh: body.gender,
      CCCD: body.cccd,
      NgayCap: body.ngayCap,
      NoiCap: body.noiCap,
      DiaChi: body.address,
      Tinh12: body.tinh12,
      Truong12: body.truong12,
      ToHop: body.tohop,
      Diem1: Number(body.diem1),
      Diem2: Number(body.diem2),
      Diem3: Number(body.diem3),
      Photo: photoUrl,
      Document: docUrl,
    };

    const result = await admissionService.submitAdmissionDocument(
      admissionData
    );

    res.json(result);
    console.log("Nộp hồ sơ xét tuyển thành công:", result._id);
    return false;
  } catch (error) {
    console.error("Lỗi khi nộp hồ sơ:", error);
    res.status(500).send("Nộp hồ sơ thất bại");
  }
}

async function getOneInfoAdmission(req, res) {
  try {
    const { cccd } = req.body;

    if (!cccd) {
      return res.status(400).json({ message: "Vui lòng cung cấp số CCCD" });
    }

    const result = await admissionService.getOneInfoAdmission(cccd);

    if (!result) {
      return res.status(404).json({ message: "Không tìm thấy hồ sơ" });
    }

    res.json(result);
  } catch (error) {
    console.error("Lỗi khi lấy hồ sơ:", error);
    res.status(500).json({ message: "Lỗi server khi lấy hồ sơ" });
  }
}

module.exports = {
  submitInfoAdmission,
  submitAdmissionDocument,
  getOneInfoAdmission
};
