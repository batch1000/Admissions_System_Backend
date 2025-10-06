const express = require("express");
const upload = require("../../config/multer");
const {
  submitInfoAdmission,
  submitAdmissionDocument,
  getOneInfoAdmission
} = require("./admission.controller");

const router = express.Router();

router.post("/submitInfoAdmission", submitInfoAdmission);
router.post(
  "/submitAdmissionDocument",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  submitAdmissionDocument
);
router.post("/getOneInfoAdmission", getOneInfoAdmission);

module.exports = router;
