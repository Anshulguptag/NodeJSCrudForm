//IMPORT MONGOOSE PACKAGE
const mongoose = require('mongoose');

//DESIGN STUDENT TABLE
var studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required: 'This field is required.'
    },
    department : {
        type : String,
        required: 'This field is required.'
    },
    rollno : {
        type : Number
    },
    cgpa : {
        type : Number
    },
});

// employeeSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');

//INSERT STUDENT MODEL
mongoose.model('Student', studentSchema);