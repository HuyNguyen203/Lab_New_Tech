const express = require("express");
const multer = require("multer");
const router = express.Router();
const { getAllCourses, saveCourse, removeCourse } = require("../controllers/course.controller");
const upload = multer({ storage: multer.memoryStorage() });  // Lưu trữ file trong bộ nhớ

router.get("/", getAllCourses);
router.post('/save', upload.single('image'), saveCourse);
router.post("/delete", removeCourse);
module.exports = router;