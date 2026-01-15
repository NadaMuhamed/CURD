let Course = require('../Models/courses');

const Homepage = (req, res) => {
  res.send(`<h1>Home Page</h1>`);
};

const getAllCourses = async(req, res) => {
  const courses = await Course.find();
  res.status(200).json(courses);
};

const getCourseById = async(req, res) => {
  const course = await Course.findById(req.params.id)
  if (!course) return res.status(404).json({ msg: 'Course not found' });
  res.status(200).json(course);
};

const createCourse = async(req, res) => {
  const course = new Course({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  await course.save();
  res.status(201).json(course);
};

const updateCourse = async(req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ msg: 'Course not found' });
  course.name = req.body.name;
  course.description = req.body.description;
  course.price = req.body.price;
  await course.save();
  res.status(200).json(course);
};

const deleteCourse = async(req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) return res.status(404).json({ msg: 'Course not found' });
  const courses = await Course.find();
  res.status(200).json(courses);
};

const editCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ msg: 'Course not found' });
  if (req.body.name !== undefined) course.name = req.body.name;
  if (req.body.description !== undefined) course.description = req.body.description;
  if (req.body.price !== undefined) course.price = req.body.price;
  await course.save();
  res.status(200).json(course);
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
