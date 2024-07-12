const router = require("express").Router();
let Employee = require("../models/employee");

router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const address = (req.body.address);
    const birth = req.body.birth;
    const contact = Number(req.body.contact);
    const nic = req.body.nic;
    const email = req.body.email;
    const gender = req.body.gender;

    const newEmployee = new Employee({

        name,
        address,
        birth,
        contact,
        nic,
        email,
        gender,
    })

    newEmployee.save().then(()=>{ 
        res.json("Employee Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{

    Employee.find().then((Employee)=>{
        res.json(Employee)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userid = req.params.id;
    const {name,address,birth,contact,nic,email,gender}= req.body;
    const updateEmployee = {
        name,
        address,
        birth,
        contact,
        nic,
        email,
        gender,
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(userid,updateEmployee)
    .then(()=>{
        res.status(200).send({status:"user updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })

}) 
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await Employee.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"user deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user",error:err.message});
    })
})

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    try {
        const user = await Employee.findById(userId);
        res.status(200).send({ status: "user fetched", user: user });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message });
    }
});


module.exports=router;
