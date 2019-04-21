require('./models/db');

const express = require('express');
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");

const mainController = require('./controllers/mainController');
const studentController = require('./controllers/studentController');
const companyController = require('./controllers/companyController');
const company_studentController = require('./controllers/company_studentController');

var app = express();
app.use(bodyparser.urlencoded({
    extended : true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');


app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use("/", mainController);

app.use("/student", studentController);

app.use("/company", companyController);

app.use("/company_student", company_studentController);

