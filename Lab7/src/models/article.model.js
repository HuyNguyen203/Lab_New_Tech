const {dynamoDB} = require("../configs/aws.helper");

const TABLE_NAME = "Article";

const getArticles = async () => {
    const params = { TableName: TABLE_NAME };
    try{
        const result = await dynamoDB.scan(params).promise();
        return result.Items;
    } catch (err){
        console.error("Error fetching articles: ", err);
        return []
    }
}

const addArticle = async (article) => {
    const params = { 
        TableName: TABLE_NAME,
        Item: article,
    };
    try {
        await dynamoDB.put(params).promise();
        console.log("Course added: ", article);
    } catch (error) {
        console.error("Error adding course: ", error);
    }
}

const deleteArticle = async(id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {id: id}
    };
    try{
        await dynamoDB.delete(params).promise();
        console.log("Article deleted:", id);
    }catch (error){
        console.error("Error deleting article:", error);
    }
}

module.exports = { getArticles, addArticle, deleteArticle }