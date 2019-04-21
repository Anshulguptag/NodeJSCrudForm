// IMPORT MODULES
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Comp_Model = mongoose.model('Company_Student'); //FOR STUDENT PER COMPANY DATABASE
const Company = mongoose.model('Company'); //FOR COMPANY DATABASE
const Student = mongoose.model('Student'); //FOR STUDENT DATABASE 

//FOR SENDING COMPANY AND STUDENT DETAILS IN FORM
router.get("/", (req,res) => {
    Company.find((err, docs1) => {
        if (!err){
            Student.find((err, docs) => {
                if (!err){
                    res.render("company_student/addOrEdit", {
                        companylist: docs1, //FOR COMPANY
                        studentlist: docs, //FOR STUDENTS
                        viewTitle : "Allot student per company"
                    });
                }
                else{
                    console.log('Error in retrieving student list : ' + err);
                }
            });
        }
        else{
            console.log('Error in retrieving company list : ' + err);
        }
    });
   
});

//INSERT RECORD
router.post("/", (req,res) => {
    insertRecord(req, res);
});

//SHOW ALL THE STUDENTS WITH THEIR COMPANIES
router.get("/list", (req,res) => {
    Comp_Model.find((err, docs) => {
        if (!err){
            res.render("company_student/list", {
                list: docs
            });
        }
        else{
            console.log('Error in retrieving company_student list : ' + err);
        }
    });
});

//FUNCTION TO INSERT RECORD
function insertRecord(req, res){
    var company_name = req.body.company_name;
    var student_name = req.body.student_name;
    //FOR SINGLE ENTRY
    if(typeof student_name=="string")
       {
            var company_student = new Comp_Model();
            company_student.company_name = company_name; //GETTING COMPANY NAME
            company_student.student_name = student_name; //GETTING STUDENT NAME
            company_student.save((err, doc)=> {
            if(err){
                if(err.name == 'ValidationError'){
                    handleValidationError(err, req.body);
                    res.render("company_student/addOrEdit",{
                        viewTitle : "Allot student per company" ,
                        company_student: req.body
                    });
                }
                console.log("Error during record insertion : "+err);
            }
            else
            {
                res.redirect('company_student/list'); //REDIRECT TO LIST PAGE
            }
       });
       }   
    //FOR ALLOTING ONE COMPANY TO MORE THAN ONE STUDENT
    else{
        for (var i=0;i<student_name.length;i++)
        {
        var company_student = new Comp_Model();
        company_student.company_name = company_name; //GETTING COMPANY NAME FROM FORM
        company_student.student_name = student_name[i]; //GETTING STUDENT NAME FROM FORM
        company_student.save((err, doc)=> {
            if(err){
                if(err.name == 'ValidationError'){
                    handleValidationError(err, req.body);
                    res.render("company_student/addOrEdit",{
                        viewTitle : "Allot student per company" ,
                        company_student: req.body
                    });
                }
                console.log("Error during record insertion : "+err);
            }
        }); 
    }
    res.redirect('company_student/list'); //REDIRECT TO LIST PAGE
    }
    
}

//FOR HANDLING ERRORS
function handleValidationError(err, body){
    for(field in err.errors)
    {
        switch (err.errors[field].path){
            case "student_name":
                body["nameError"] = err.errors[field].message;
                break;
            case "company_name":
                body["departmentError"] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

//DELETE ENTRY
router.get("/delete/:id", (req, res) => {
    Comp_Model.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (err,doc) => {
        if (!err){
            res.redirect('/company_student/list');
        }
        else{
            console.log("Error in company delete: "+err);
        }
    });
});

//PROVIDE MIDDLEWARE AUTHENTICATION
module.exports = router;