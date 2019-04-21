//IMPORTING MODULES
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Company = mongoose.model('Company'); //COMPANY DATABASE

//RENDERING ENTRY/UPDATE PAGE
router.get("/", (req,res) => {
    res.render("company/addOrEdit",{
        viewTitle : "Insert Company"
    });
});

//INSERT ENTRY IN DB
router.post("/", (req,res) => {
    if(req.body._id == '')
        insertRecord(req, res);
    else
        updaterecord(req, res);
});

//SHOW ALL THE ENTRY PRESENT IN COMPANY DB
router.get("/list", (req,res) => {
    Company.find((err, docs) => {
        if (!err){
            res.render("company/list", {
                list: docs
            });
        }
        else{
            console.log('Error in retrieving company list : ' + err);
        }
    });
});

//DELETE ENTERY BY USING ID
router.get("/delete/:id", (req, res) => {
    Company.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (err,doc) => {
        if (!err){
            res.redirect('/company/list');
        }
        else{
            console.log("Error in company delete: "+err);
        }
    });
});

//INSERT RECORD FUNCTION
function insertRecord(req, res){
    var company = new Company();
    company.name = req.body.name;
    company.address = req.body.address;
    company.mobile = req.body.mobile;
    company.save((err, doc)=> {
        if(!err)
            res.redirect('company/list');
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("company/addOrEdit",{
                    viewTitle : "Insert company" ,
                    company: req.body
                });
            }
            console.log("Error during record insertion : "+err);
        }
    }); 
}

//HANDLING ERROR
function handleValidationError(err, body){
    for(field in err.errors)
    {
        switch (err.errors[field].path){
            case "name":
                body["nameError"] = err.errors[field].message;
                break;
            case "address":
                body["addressError"] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

//PROVIDE MIDDLEWARE AUTHENTICATION
module.exports = router;
