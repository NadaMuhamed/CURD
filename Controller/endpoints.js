let Course = require("../Models/courses");
const STATUS = require("../utils/httpStatusText");
const AppError = require("../utils/AppError");
const asyncWrapper = require("../Middleware/asyncWrapper");
const mongoose = require("mongoose");

const Homepage = (req, res) => {
  res.send(`<h1>Home Page</h1>`);
};

const getAllCourses = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  const limit = parseInt(query.limit) || 0;
  const page = parseInt(query.page) || 1;
  const skip = (page - 1) * limit;

  const courses = await Course.find({}, { __v: 0 }).limit(limit).skip(skip);

  res.status(200).json({ status: STATUS.SUCCESS, data: courses });
});

const getCourseById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return next(new AppError("Invalid course id", 400));
  }

  const course = await Course.findById(id);

  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  res.status(200).json({ status: STATUS.SUCCESS, data: course });
});

const createCourse = asyncWrapper(async (req, res, next) => {
  const course = new Course({
    name: req.body.name,
    discretion: req.body.discretion,
    price: req.body.price,
  });

  await course.save();
  res.status(201).json({ status: STATUS.SUCCESS, data: course });
});

const updateCourse = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return next(new AppError("Invalid course id", 400));
  }

  const course = await Course.findById(id);

  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  course.name = req.body.name;
  course.discretion = req.body.discretion;
  course.price = req.body.price;

  await course.save();
  res.status(200).json({ status: STATUS.SUCCESS, data: course });
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return next(new AppError("Invalid course id", 400));
  }

  const course = await Course.findByIdAndDelete(id);

  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  res
    .status(200)
    .json({ status: STATUS.SUCCESS, msg: "Course deleted successfully" });
});

const editCourse = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return next(new AppError("Invalid course id", 400));
  }

  const course = await Course.findById(id);

  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  if (req.body.name !== undefined) course.name = req.body.name;
  if (req.body.discretion !== undefined) course.discretion = req.body.discretion;
  if (req.body.price !== undefined) course.price = req.body.price;

  await course.save();
  res.status(200).json({ status: STATUS.SUCCESS, data: course });
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
