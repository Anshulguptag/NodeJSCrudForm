//FOR HOMEPAGE
const express = require('express');
var router = express.Router();
router.get("/", (req,res) => {
    res.render("main/index",{
        viewTitle : "Insert Student"
    });
});

//PROVIDE MIDDLEWARE AUTHENTICATION
module.exports = router;