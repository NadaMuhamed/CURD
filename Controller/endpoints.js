let courses = require('../Models/courses');



const Homepage = (req, res) => {
  res.send(`<h1>Home Page</h1>`);
};

const getAllCourses = (req, res) => {
  res.json(courses);
};

const getCourseById = (req, res) => {
  const courseId = +req.params.id;
  const course = courses.find(course => course.id === courseId);
  if (!course) return res.status(404).json({ msg: 'Course not found' });
  res.json(course);
};

const createCourse = (req, res) => {
  req.body.id = courses.length + 1;
  courses.push(req.body);
  res.status(201).json(courses);
};

const updateCourse = (req, res) => {
  const courseId = +req.params.id;
  const course = courses.find(course => course.id === courseId);
  if (!course) return res.status(404).json({ msg: 'Course not found' });

  course.name = req.body.name;
  course.description = req.body.description;
  course.price = req.body.price;

  res.status(200).json(course);
};

const deleteCourse = (req, res) => {
  const courseId = +req.params.id;
  courses = courses.filter(course => course.id !== courseId);
  res.status(200).json(courses);
};

const editCourse = (req, res) => {
  const courseId = +req.params.id;
  const course = courses.find(course => course.id === courseId);
  if (!course) return res.status(404).json({ msg: 'Course not found' });

  Object.assign(course, req.body);
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
