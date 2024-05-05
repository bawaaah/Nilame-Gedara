const express = require('express')
const router = express.Router()
const itemSchema = require('../models/item')
const Product = require('../models/product')



router.route('/add').post((req,res)=>{
    const pid = req.body.pid;
    const name = req.body.name;
    const pQty = Number(req.body.pQty);
    const category = req.body.category;
    const description = req.body.description;
    const rentalPrice = Number(req.body.rentalPrice);
    const availability = Boolean(req.body.availability);
    const image = Object(req.body.image)

    const newItem = new itemSchema({
        pid,
        name,
        pQty,
        category,
        description,
        rentalPrice,
        availability,
        image
    }
    )

    newItem.save()
    .then(()=>{
        res.json("Item added to catalog");
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json("Error: Item not added to catalog");
    })
})

router.route('/allItems').get((req,res) => {
    itemSchema.find().then((items) => {
        res.json(items)
    })
    .catch((err) => {
        console.log(err)
    })
})
router.route("/getAllImages").get(async (req, res) => {
    try {
        // Retrieve all category
        const ItemSchema = await itemSchema.find();
        

        // Check if there are no category
        if (!ItemSchema || ItemSchema.length === 0) {
            return res.status(404).json({ status: "Error", message: "No category found" });
        }

        // Convert binary image data to base64 for each category
        const categoryWithImages = ItemSchema.map(itemSchema => {
            // Check if category.image is defined
            const imageData = itemSchema.image && itemSchema.image.data ? itemSchema.image.data.toString('base64') : null;
            return { ...itemSchema.toJSON(), image: imageData };
        });

        // Send response with category details and image data
        res.status(200).json({ status: "category fetched", itemSchema: categoryWithImages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error", error: err.message ,ItemSchema});
    }
});
router.route('/deleteItem/:id').delete(async (req,res) => {

    let itemId = req.params.id

    await itemSchema.findOneAndDelete({pid: itemId}).then(()=>{
        res.status(200).send({status: "Item Deleted"}) 
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with delete item", error: err.message}); 
    })

})

router.route('/isSelect/:id').put(async (req,res) => {
    let productId = req.params.id

    const isSelect = req.body.isSelect

    const update = await Product.findByIdAndUpdate(productId,{ isSelect: isSelect}).then(()=>{
        res.status(200).send({status: "Product updated" }) 
    }).catch((err) => {
        console.log(err)
        res.status(500).send({status: "Error with update data", error: err.message})
    })
})

router.route('/single/:id').get(async (req,res) => {
    const id = req.params.id
    itemSchema.findById(id).then((item)=>{
        res.json(item)
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.route('/getSingleItem/:id').get(async (req,res) => {
    const itemId = req.params.id
    const item = await itemSchema.findById(itemId)

    if (!item) {
        return res.status(404).json({ status: "Error", message: "Item not found" });
    }

    const dataImage = item.image ? item.image.data.toString('base64') : null

    res.status(200).json({ status: "Item fetched", item: { ...item.toJSON(), image: dataImage } })
})



module.exports = router;