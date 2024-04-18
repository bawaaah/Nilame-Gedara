const express = require("express");

const router = express.Router();

const itemSchema = require("../models/item");

router.get("/test",(req,res)=>{
    res.send("W o r k i n g ! ! !");
})

module.exports = router;