const express = require('express')
const router = express.Router()
const order = require('../models/order')
const {v4 : uuidv4} = require('uuid')

router.route('/add').post((req,res) => {
    const orderId = uuidv4()
    const productName = req.body.productName
    const count = Number(req.body.count)
    const unitPrice = Number(req.body.unitPrice)
    const date = (req.body.date)
    const total = (count)*unitPrice
    const iID = req.body.iID

    const newOrder = new order({
        orderId,
        productName,
        count,
        unitPrice,
        date,
        total,
        iID
    })

    newOrder.save()
    .then(()=>{
        res.json("Order added ");
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json("Error: Order not added ");
    })
})

module.exports = router