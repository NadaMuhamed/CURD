let Course = require('../Models/courses');
const STATUS = require('../utils/httpStatusText');
const Homepage = (req, res) => {
  res.send(`<h1>Home Page</h1>`);
};

const getAllCourses = async(req, res) => {
  try {
    const query = req.query;
    const limit = parseInt(query.limit) || 0;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * limit;
    const courses = await Course.find({}, { __v: 0 }).limit(limit).skip(skip);
    res.status(200).json({status: STATUS.SUCCESS, data: courses});
  } catch (error) {
    res.status(400).json({status: STATUS.ERROR, data:null, code: 400, message: error.message});
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({status: STATUS.FAILURE, data: {course: null}});
    res.status(200).json({status: STATUS.SUCCESS, data: course});
  } catch (error) {
    return res.status(400).json({status: STATUS.ERROR, data:null, code: 400, message: error.message});
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
    res.status(201).json({status: STATUS.SUCCESS, data: course});
  } catch (error) {
    res.status(400).json({status: STATUS.ERROR, data:null, code: 400, message: error.message});
  }
};

const updateCourse = async(req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({status: STATUS.FAILURE, data: {course: null}});
    course.name = req.body.name;
    course.discretion = req.body.discretion;
    course.price = req.body.price;
    await course.save();
    res.status(200).json({status: STATUS.SUCCESS, data: course});
  } catch (error) {
    res.status(400).json({status: STATUS.ERROR, data:null, code: 400, message: error.message});
  }
};

const deleteCourse = async(req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({status: STATUS.FAILURE, data: {course: null}});
    res.status(200).json({status: STATUS.SUCCESS, msg: 'Course deleted successfully'});
  } catch (error) {
    res.status(400).json({status: STATUS.ERROR, data:null, code: 400, message: error.message});
  }
};

const editCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({status: STATUS.FAILURE, data: {course: null}});
    if (req.body.name !== undefined) course.name = req.body.name;
    if (req.body.discretion !== undefined) course.discretion = req.body.discretion;
    if (req.body.price !== undefined) course.price = req.body.price;
    await course.save();
    res.status(200).json({status: STATUS.SUCCESS, data: course});
  } catch (error) {
    res.status(400).json({status: STATUS.ERROR, data:null, code: 400, message: error.message});
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
