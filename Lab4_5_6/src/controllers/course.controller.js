const {getCourses, addCourse, deleteCourse} = require("../models/course.model");
const {uploadToS3} = require("../services/upload.server");

const getAllCourses = async (req, res) => {
    try {
        const courses = await getCourses();
        return res.render("index", { courses });
    } catch (error) {
        return res.status(500).json({ messages: "Error fetching courses" });
    }
}


const saveCourse = async (req, res) => {
    const id = Number(req.body.id);    

    if(isNaN(id)) {
        return res.status(400).json({ message: "Invalid id, it must be a number" });
    }

    let imageUrl = null;
    if(req.file) {
        try {
            const uploadedImage = await uploadToS3(req.file);
            imageUrl = uploadedImage.Location;
        } catch (error) {
            return res.status(500).json({ message: "Error uploading image", error: error.message });
        }
    }
    try {
        const course = {
            id: String(id),
            name: req.body.name,
            course_type: req.body.course_type,
            semester: req.body.semester,
            department: req.body.department,
            image: imageUrl
        };
        await addCourse(course);
        return res.redirect("/");
    } catch (error) {
        return res.status(500).json({ message: "Error adding course" });
    }
}

const removeCourse = async (req, res) => {
    // Ensure 'id' is a number
    const id = req.body.id;
   
    // Check if the conversion to number was successful (if not, handle the error)
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid id, it must be a number" });
    }
   try {
       const courseId = id;
       await deleteCourse(courseId);
       return res.redirect("/");
   } catch (error) {
       return res.status(500).json({ message: "Error deleting course" });
   }
};

module.exports = { getAllCourses, saveCourse, removeCourse };

