
const {Product} = require('../models/product');
const express = require('express');
const router=express.Router();

//http://localhost:3000/api/one/products 
router.get(`/`, async (req,res) =>{
    //2 prameters the route itself //and a callback with response which is sent to client when he calls this route
    const productList= await Product.find(); //await to get the list populated....async in=s needed now

    if(!productList){
        res.status(500).json({success:false});
    }
    res.send(productList);//sending to front end
});

router.post(`/`,(req,res) =>{
    const product= new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)//success
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
    
})

module.exports =router;