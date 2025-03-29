const express = require("express");
const multer = require("multer");
const { getAllAticles, saveAticle, removeArticle } = require("../controllers/article.controler");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllAticles);
router.post("/save", upload.single("image"), saveAticle);
router.post("/delete", removeArticle);
module.exports = router