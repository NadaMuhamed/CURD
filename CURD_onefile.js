const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());
const {body, validationResult} = require('express-validator');


let courses = [
    { id: 1, name: 'Mathematics', description: 'An introduction to Mathematics', price: 100 },
    { id: 2, name: 'Physics', description: 'Basics of Physics', price: 120 },
    { id: 3, name: 'Chemistry', description: 'Fundamentals of Chemistry', price: 110 },
];

app.get('/', (req, res) => {
    res.send(`<h1>Home Page</h1>`);
});

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.get('/course/:id', (req, res) => {
    const courseId = +req.params.id;
    const course = courses.find(course => course.id === courseId);
    if (!course) {
        return res.status(404).json({ msg: 'Course not found' });
    }
    res.json(course);
});

app.post('/course/', express.json(), (req, res) => {
    req.body.id = courses.length + 1;
    courses.push(req.body);
    res.status(201).json(courses);
});

app.put('/course/:id',[body('name').isString(), body('description').isString(), body('price').isNumeric()] ,express.json(), (req, res) => {
    const courseId = +req.params.id;
    const course = courses.find(course => course.id === courseId);
    if (!course) {
        return res.status(404).json({ msg: 'Course not found' });
    }
    course.name = req.body.name;
    course.description = req.body.description;
    course.price = req.body.price;
    res.status(201).json(courses);
});

app.delete('/course/:id', (req, res) => {
    courses = courses.filter(course => course.id !== parseInt(req.params.id));
    res.status(201).json(courses);
});

app.patch('/course/:id', express.json(), (req, res) => {
    const courseId = +req.params.id;
    let course = courses.find(course => course.id === courseId);
    if (!course) {
        return res.status(404).json({ msg: 'Course not found' });
    }
    course = { ...course, ...req.body };
    res.status(201).json(course);
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

module.exports = app;