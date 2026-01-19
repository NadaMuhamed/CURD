let Course = require('../Models/courses');
const STATUS = require('../utils/httpStatusText');
const asyncWrapper = require('../Middleware/asyncWrapper');


const Homepage = (req, res) => {
  res.send(`<h1>Home Page</h1>`);
};

const getAllCourses = asyncWrapper(async(req, res, next) => {
  const query = req.query;
  const limit = parseInt(query.limit) || 0;
  const page = parseInt(query.page) || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, { __v: 0 }).limit(limit).skip(skip);
  res.status(200).json({status: STATUS.SUCCESS, data: courses});
});

const getCourseById = asyncWrapper(async(req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    const error = new Error();
    error.message = 'Course not found';
    error.status = 404;
    return next(error);
  }
  res.status(200).json({status: STATUS.SUCCESS, data: course});
});

const createCourse = asyncWrapper(async(req, res, next) => {
    const course = new Course({
      name: req.body.name,
      discretion: req.body.discretion,
      price: req.body.price,
    });
    await course.save();
    res.status(201).json({status: STATUS.SUCCESS, data: course});
  });

const updateCourse = asyncWrapper(async(req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
      const error = new Error();
      error.message = 'Course not found';
      error.status = 404;
      return next(error);
    }
    course.name = req.body.name;
    course.discretion = req.body.discretion;
    course.price = req.body.price;
    await course.save();
    res.status(200).json({status: STATUS.SUCCESS, data: course});
});

const deleteCourse = asyncWrapper(async(req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      const error = new Error();
      error.message = 'Course not found';
      error.status = 404;
      return next(error);
    }
    res.status(200).json({status: STATUS.SUCCESS, msg: 'Course deleted successfully'});
});

const editCourse = asyncWrapper(async(req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
      const error = new Error();
      error.message = 'Course not found';
      error.status = 404;
      return next(error);
    }
    if (req.body.name !== undefined) course.name = req.body.name;
    if (req.body.discretion !== undefined) course.discretion = req.body.discretion;
    if (req.body.price !== undefined) course.price = req.body.price;
    await course.save();
    res.status(200).json({status: STATUS.SUCCESS, data: course});
});


module.exports = {
  Homepage,
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  editCourse,
};
