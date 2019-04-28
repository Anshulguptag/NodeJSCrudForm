//IMPORTING MODULES
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student'); //STUDENT DATABASE
const Comp_Model = mongoose.model('Company_Student'); //FOR STUDENT PER COMPANY DATABASE

//RENDERING STUDENT ENTRY/UPDATE PAGE
router.get("/", (req,res) => {
    res.render("student/addOrEdit",{
        viewTitle : "Insert Student"
    });
});

//INSERT ENTRY IN DB
router.post("/", (req,res) => {
    if(req.body._id == '')
        insertRecord(req, res);
    else
        updaterecord(req, res);
});

//INSERT RECORD INTO DB FUNCTION
function insertRecord(req, res){
    var student = new Student();
    student.name = req.body.name;
    student.department = req.body.department;
    student.rollno = req.body.rollno;
    student.cgpa = req.body.cgpa;
    student.save((err, doc)=> {
        if(!err)
            res.redirect('student/list');
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("student/addOrEdit",{
                    viewTitle : "Insert Student" ,
                    student: req.body
                });
            }
            console.log("Error during record insertion : "+err);
        }
    }); 
}


//UPDATE RECORD FUNCTION
function updaterecord(req, res){
    Student.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true, useFindAndModify: false}, (err, doc) => {
        if (!err) {
            console.log("Successfully Updated..");
            res.redirect('student/list');}
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("student/addOrEdit",{
                    viewTitle : "Update student" ,
                    student: req.body
                });
            }
            console.log("Error during record updation : "+err);
        } 
    });
}

//LIST OF ALL STUDENTS
router.get("/list", (req,res) => {
    Student.find((err, docs) => {
        if (!err){
            res.render("student/list", {
                list: docs
            });
        }
        else{
            console.log('Error in retrieving student list : ' + err);
        }
    });
});

//HANDLING ERRORS
function handleValidationError(err, body){
    for(field in err.errors)
    {
        switch (err.errors[field].path){
            case "name":
                body["nameError"] = err.errors[field].message;
                break;
            case "department":
                body["departmentError"] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

//FOR UPDATING ENTRY BY USING ID
router.get("/:id", (req, res)=>{
    Student.findById(req.params.id, (err, doc)=>{
        if (!err){
            res.render("student/addOrEdit",{
                viewTitle: "Update student",
                student: doc
            });
        }
    });
});

//FOR DELETING ENTERY USING ID
router.get("/delete/:id", (req, res) => {
    Student.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (err,doc) => {
        if (!err){
            var myquery = { student_name: req.params.id};
            Comp_Model.deleteMany(myquery,function(err, doc){
                if(!err){
                    res.redirect('/student/list');
                }
                else{
                    console.log("Error in company_student delete: "+err);
                }
            });
        }
        else{
            console.log("Error in student delete: "+err);
        }
    });
});

//PROVIDE MIDDLEWARE AUTHENTICATION
module.exports = router;