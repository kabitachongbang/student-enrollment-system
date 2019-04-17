const express = require('express');
const app = express();
const path = require('path');
const router = require('./Routes/api/formData');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//api route of each student
app.use('/api/formData', router);
//route to public folder
app.use(express.static(path.join(__dirname + '/public')));

//create port
const PORT = process.env.PORT || 3000;
//listen to port

app.listen(PORT, function (req, res) {
    console.log(`hello from ${PORT} port`);
});

