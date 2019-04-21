//IMPORT MONGOOSE PACKAGE
const mongoose = require('mongoose');

//DESIGN COMPANY TABLE
var companySchema = new mongoose.Schema({
    name : {
        type : String,
        required: 'This field is required.'
    },
    address : {
        type : String,
        required: 'This field is required.'
    },
    mobile : {
        type : Number
    }
});

//INSERT COMPANY MODEL
mongoose.model('Company', companySchema);