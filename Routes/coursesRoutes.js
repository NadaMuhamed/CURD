const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const endpoint_courses = require('../Controller/endpoints');
const validateRequest = require('../Middelware/validateRequest');



router.get('/',endpoint_courses.Homepage);

router.get('/courses', endpoint_courses.getAllCourses);

router.get('/course/:id', endpoint_courses.getCourseById );

router.post('/course/', 
    [body('name').isString(), 
    body('description').isString(), 
    body('price').isNumeric()],
    validateRequest,
    endpoint_courses.createCourse
);

router.put('/course/:id',
    [body('name').isString(), 
    body('description').isString(),
    body('price').isNumeric()],
    validateRequest,
    endpoint_courses.updateCourse
);

router.delete('/course/:id', endpoint_courses.deleteCourse );

router.patch('/course/:id',
    [
        body('name').optional().isString(),
        body('description').optional().isString(),
        body('price').optional().isNumeric(),
    ],
    validateRequest,
    endpoint_courses.editCourse 
);

module.exports = router;