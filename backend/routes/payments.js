const router = require("express").Router();
let Payment = require("../models/Payment");

router.route("/add").post((req,res) =>{

    const { orderId, customerName, userId, itemId, amount } = req.body;

    

    const newPayment = new Payment({
        orderId,
        customerName,
        userId,
        Date: new Date(),
        itemId,
        amount,
    })

    newPayment.save().then(() => {
        res.json("Payment Added")
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/").get((req,res) => {

    Payment.find().then((payments) => {
        res.json(payments)
    }).catch((err) => {
        console.log(err)
    })
})
//we cannnot give static id for this therefore :id use fetch data for each student
// router.route("/update/:id").put(async (req,res) => { //async is wait until promise is com from function
//     let userId = req.params.id;
//     const {name, age, gender} = req.body;//d strructure new feature in js frond end variable structure in to one var

//     const updateStudent = {
//         name,
//         age,
//         gender
//     }

//     const update = await Student.findByIdAndUpdate(userId,updateStudent).then(() => {  //await use wait until update completed

//         res.status(200).send({status : "User updated"})
//     }).catch((err) => {
//         console.log(err);
//         res.status(500).send({status : "Error with updating data", error : err.message});
//     })

    

// })  

// router.route("/delete/:id").delete(async (req,res) => {
//     let userId = req.params.id;

//     await Student.findByIdAndDelete(userId).then(() => {
//         res.status(200).send({status: "User deleted"});
//     }).catch((errr) => {
//         console.log(errr.message);
//         res.status(500).send({status: "Error with delete user", error: errr.message});
//     })
// })

router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;
    const user =await Payment.findById(userId).then((payment) => {
        res.status(200).send({status: "User fetched", payment})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

module.exports = router;
