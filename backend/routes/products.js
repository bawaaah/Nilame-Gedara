const router = require("express").Router();
let Product = require("../models/product");

//CRUD - Add
router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const pid = Number(req.body.pid);
    const category = req.body.category;

    const newProduct = new Product({ //create object from product
        name,
        pid,
        category
    })

    newProduct.save().then(()=>{//mongo db ekata pass karanawa
        res.json("Product Added") //if success
    }).catch((err)=>{
        console.log(err); //else if not success
    }) 

})

//CRUD - read
router.route("/").get((req,res)=>{

    Product.find().then((product)=>{ //can modify .find function
        res.json(product)
    }).catch((err)=>{
        console.log(err); 
    }) 
})

//CRUD - update
router.route("/update/:id").put(async (req,res) => {
    let productId = req.params.id;
    const {name,pid,category} = req.body;

    const updateProduct = {
        name,
        pid,
        category
    }

    const update = await Product.findByIdAndUpdate(productId,updateProduct).then(()=>{
        res.status(200).send({status: "Product updated" }) //user sure na
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with update data", error: err.message}); 
    })

})

//CRUD - delete
router.route("/delete/:id").delete(async (req,res) => {
    let productId = req.params.id;

    await Product.findByIdAndDelete(productId).then(() => {
        res.status(200).send({status: "Product Deleted"}) 
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with delete product", error: err.message}); 
    })

})

//CRUD - read(Single product)
router.route("/get/:id").get(async (req, res) => {
    let productId = req.params.id;
    const user = await Product.findById(productId).then( (product) => {
        res.status(200).send({status: "Product fletched", product}) 
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error ", error: err.message}); 
    })

})

// Get count of all documents
router.route("/count").get(async (req, res) => {
    try {
        const count = await Product.countDocuments();
        res.status(200).json({ count });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
});

// Get from category 01
router.route("/category01").get((req, res) => {
    Product.find({ category: "category 01" }).then((products) => {
        res.json(products);
    }).catch((err) => {
        console.log(err);
    });
});

//get low stocked items
router.route("/lowCount").get(async (req, res) => {
    try {
        const count = await Product.countDocuments({ pid: { $lt: 10 } });
        res.status(200).json({ count });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
});

//Add Damage Items
router.route("/addDamage/:id").put(async (req,res) => {
    let productId = req.params.id;
    const {pid,isDamaged,DamagedQty} = req.body;

    const updateProduct = {
        pid,
        isDamaged,
        DamagedQty 
    }

    const update = await Product.findByIdAndUpdate(productId,updateProduct).then(()=>{
        res.status(200).send({status: "Product updated" }) //user sure na
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with update data", error: err.message}); 
    })

})

// Get All damaged
router.route("/getDamaged").get((req, res) => {
    Product.find({ isDamaged: true }).then((products) => {
        res.json(products);
    }).catch((err) => {
        console.log(err);
    });
});

// Delete Damaged Items
router.route("/deleteDamaged/:id").put(async (req,res) => {
    let productId = req.params.id;

    const isDamaged = false;


    const updateProduct = {
        isDamaged
    }

    const update = await Product.findByIdAndUpdate(productId,updateProduct).then(()=>{
        res.status(200).send({status: "Product updated" }) //user sure na
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with update data", error: err.message}); 
    })

})

//---------------------------

//Add Disposed Items
router.route("/addDispoed/:id").put(async (req,res) => {
    let productId = req.params.id;
    const {qty,isDisposed,DisposedQty} = req.body;

    const pid = qty - DisposedQty;

    const updateProduct = {
        pid,
        isDisposed,
        DisposedQty 
    }

    const update = await Product.findByIdAndUpdate(productId,updateProduct).then(()=>{
        res.status(200).send({status: "Product updated" }) //user sure na
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with update data", error: err.message}); 
    })

})

// Get All Disposed
router.route("/getDisposed").get((req, res) => {
    Product.find({ isDisposed: true }).then((products) => {
        res.json(products);
    }).catch((err) => {
        console.log(err);
    });
});

// Delete Disposed Items
router.route("/deleteDisposed/:id").put(async (req,res) => {
    let productId = req.params.id;

    const isDisposed = false;


    const updateProduct = {
        isDisposed
    }

    const update = await Product.findByIdAndUpdate(productId,updateProduct).then(()=>{
        res.status(200).send({status: "Product updated" }) //user sure na
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with update data", error: err.message}); 
    })

})

// Damage Item Count
router.route("/damagedItemCount").get(async (req, res) => {
    try {
        const count = await Product.countDocuments({ isDamaged: true });
        res.status(200).json({ count });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
});

// Disposed Item Count
router.route("/disposedItemCount").get(async (req, res) => {
    try {
        const count = await Product.countDocuments({ isDisposed: true });
        res.status(200).json({ count });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
});



module.exports = router;