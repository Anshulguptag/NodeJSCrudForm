//IMPORT MONGOOSE PACKAGE
const mongoose = require("mongoose");

//DESIGN COMPANY_STUDENT TABLE
var company_studentSchema = new mongoose.Schema({
    student_name : String,
    company_name : String
});

//INSERT COMPANY_STUDENT MODEL
mongoose.model('Company_Student', company_studentSchema);