const express = require("express");
const router = express.Router();
const product = require("../models/product");

router.route('/').get((req,res) => {
    product.find().then((product) => {
        res.json(product);
    })
    .catch((err) => {
        console.log(err);
    })
})

module.exports = router;