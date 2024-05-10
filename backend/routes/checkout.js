const express = require('express')
const router = express.Router()
const order = require('../models/order')

router.route('/getOrder/:id').get(async(req,res)=>{
    const id = req.params.id
    order.findOne({iID: id}).then((order) => {
        res.json(order)
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.route('/getOrder2/:id').get(async(req,res)=>{
    const id = req.params.id
    order.findById(id).then((order) => {
        res.json(order)
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.route('/updateOrder/:id').put(async(req,res)=>{
    let id = req.params.id

    const data = req.body

    const update = await order.findByIdAndUpdate(id,data)
    .then(()=>{
        res.status(200).send({status: "Order updated" }) 
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send({status: "Error with update data", error: err.message})
    })
})

router.route('/deleteOrder/:id').delete(async(req,res)=>{
    let id = req.params.id

    await order.findByIdAndDelete(id).then(()=>{
        res.status(200).send({status: "Item Deleted"}) 
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with delete item", error: err.message}); 
    })
})
module.exports = router;