const {dynamoDB} = require("../configs/aws.helper");

const TABLE_NAME = "Subject";

// Get list course
const getCourses = async () => {
    const params = { TableName: TABLE_NAME };
    try {
        const result = await dynamoDB.scan(params).promise();
        return result.Items;
    } catch (error) {
        console.error("Error fetching courses:", error);
        return []
    }
}

// Add course
const addCourse = async (course) => {
    const params = {
        TableName: TABLE_NAME,
        Item: course,
    };
    try {
        await dynamoDB.put(params).promise();
        console.log("Course added:", course);
    } catch (error) {
        console.error("Error adding course:", error);        
    }
}

const deleteCourse = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id: id }
    };
    try {
        await dynamoDB.delete(params).promise();
        console.log("Course deleted:", id);
    } catch (error) {
        console.error("Error deleting course:", error);
    }
}

module.exports = { getCourses, addCourse, deleteCourse };