let Course = require('../Models/courses');

const Homepage = (req, res) => {
  res.send(`<h1>Home Page</h1>`);
};

const getAllCourses = async(req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: "Course not found" });
    res.status(200).json(course);
  } catch (err) {
    return res.status(400).json({ msg: "Invalid ID" });
  }
};

const createCourse = async(req, res) => {
  try {
    const course = new Course({
      name: req.body.name,
      discretion: req.body.discretion,
      price: req.body.price,
    });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateCourse = async(req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    course.name = req.body.name;
    course.discretion = req.body.discretion;
    course.price = req.body.price;
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteCourse = async(req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    res.status(200).json({ msg: 'Course deleted successfully', course });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const editCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    if (req.body.name !== undefined) course.name = req.body.name;
    if (req.body.discretion !== undefined) course.discretion = req.body.discretion;
    if (req.body.price !== undefined) course.price = req.body.price;
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


module.exports = {
  Homepage,
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  editCourse,
};
