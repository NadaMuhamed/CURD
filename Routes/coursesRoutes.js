const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const endpoint_courses = require("../Controller/endpoints");
const validateRequest = require("../Middleware/validateRequest");

router.get("/", endpoint_courses.Homepage);

router.get("/courses", endpoint_courses.getAllCourses);

router.get("/courses/:id", endpoint_courses.getCourseById);

router.post(
  "/courses",
  [
    body("name").isString().notEmpty(),
    body("discretion").isString().notEmpty(),
    body("price").isNumeric(),
  ],
  validateRequest,
  endpoint_courses.createCourse
);

router.put(
  "/courses/:id",
  [
    body("name").isString().notEmpty(),
    body("discretion").isString().notEmpty(),
    body("price").isNumeric(),
  ],
  validateRequest,
  endpoint_courses.updateCourse
);

router.delete("/courses/:id", endpoint_courses.deleteCourse);

router.patch(
  "/courses/:id",
  [
    body("name").optional().isString(),
    body("discretion").optional().isString(),
    body("price").optional().isNumeric(),
  ],
  validateRequest,
  endpoint_courses.editCourse
);

module.exports = router;
