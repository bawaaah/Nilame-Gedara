const express = require("express")
const router = express.Router()
const product = require("../models/product")

router.route('/').get((req,res) => {
    product.find().then((product) => {
        res.json(product)
    })
    .catch((err) => {
        console.log(err)
    })
})  


router.route('/single/:id').get(async (req,res) => {
    const id = req.params.id
    product.findById(id).then((check)=>{
        res.json(check.isSelect)
    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports = router;