const express = require('express');
const app = express();
const port = process.env.PORT ||8080;


app.use(express.json());
const coursesRoutes = require('./Routes/coursesRoutes');
app.use('/', coursesRoutes);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

module.exports = app;