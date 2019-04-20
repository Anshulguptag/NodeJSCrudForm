const express = require('express');
var router = express.Router();
router.get("/", (req,res) => {
    res.render("main/index",{
        viewTitle : "Insert Employee"
    });
});

// It provides middleware
module.exports = router;