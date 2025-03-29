const {addArticle, deleteArticle, getArticles} = require("../models/article.model");
const {uploadToS3} = require("../services/upload.server");

const getAllAticles = async(req, res) => {
    try {
        const articles = await getArticles();
        return res.render("index", { articles });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching articles"
        });
    }
}

const saveAticle = async(req, res) => {
    const id = req.body.id;
    let imageUrl = null;
    
    if(req.file){
        try {
            const uploadedImage = await uploadToS3(req.file);
            imageUrl = uploadedImage.Location;
        } catch (error) {
            return res.status(500).json({
                message: "Error uploading image", error: error.message
            });
        }
    }
    try {
        const article = {
            id: id,
            name: req.body.name,
            author: req.body.author,
            isbn: req.body.isbn,
            page: Number(req.body.page),
            year: Number(req.body.year),
            image: imageUrl,
        }
        await addArticle(article)
        return res.redirect("/")
    } catch (error) {
        return res.status(500).json({
            message: "Error adding article"
        });
    }
}

const removeArticle = async(req, res) => {
    const id = req.body.id

    try {
        const articleId = id;
        await deleteArticle(articleId);
        return res.redirect("/")
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting article"
        });
    }
}

module.exports = { getAllAticles, saveAticle, removeArticle }