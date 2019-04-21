//IMPORT MONGOOSE PACKAGE
const mongoose = require('mongoose');

//MAKE CONNECTION WITH MONGODB
mongoose.connect('mongodb://localhost:27017/NodeJS', { useNewUrlParser: true },(err)=>{
    if (!err) {console.log('MongoDB Connected')}
    else { console.log('Error in DB connection : ' + err)}
});

//IMPORT ALL MODELS

//STUDENT MODEL
require('./student.model');

//COMPANY MODEL
require('./company.model');

//COPANY_STUDENT MODEL
require('./company_student.model');