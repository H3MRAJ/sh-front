
const {Product} = require('../models/product');
const express = require('express');
const {Category} = require('../models/category');
const router=express.Router();
const mongoose=require('mongoose');


//http://localhost:3000/api/one/products 
router.get(`/`, async (req,res) =>{
    //2 prameters the route itself //and a callback with response which is sent to client when he calls this route
    let filter={}
    // filter using category name url/products?categories=cat1,cat2
    if(req.query.categories){
        filter={category: req.query.categories.split(',')} // get the categoties from the query of url convert into array
    }

    const productList= await Product.find(filter).populate('category');
    //const productList= await Product.find().select('name image -_id'); // ! to show only the 'name' and 'image' of the data...minus the '_id'
    if(!productList){
        res.status(500).json({success:false});
    }
    res.send(productList);//sending to front end
});

router.get(`/:id`, async (req,res) =>{
   const product= await Product.findById(req.params.id).populate('category');//populate category with its details

    if(!product){
        res.status(500).json({success:false});
    }
    res.send(product);//sending to front end
});

router.post(`/`, async (req,res) =>{

    const category= await Category.findById(req.body.category);
    if(!category)
        return res.status(400).send('Invalid Category')

    let product= new Product({ // const giving error for line 37
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand, //check if brand is required or not
        price: req.body.price,
        category: req.body.category, //check if category exists
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    product = await product.save();

    if(!product)
        return res.status(500).send('The product cannot be created')
    res.send(product)
   
    
})

router.put('/:id', async (req, res) =>{ // update product by ID
    //first thing is to check if the product id is valid or not
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('Invalid Product ID');
    }
    //check if category exists
    const category= await Category.findById(req.body.category);
    if(!category)
        return res.status(400).send('Invalid Category')


    const product = await Product.findByIdAndUpdate(
        req.params.id,//first parameter
        { // second parameter is object
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand, 
            price: req.body.price,
            category: req.body.category, 
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        {// 3rd parameter an object to return the updated value
            new: true
        }
        )
    if(!product)
        return res.status(500).send('The Product cannot be Updated!')

    res.send(product);
    
})

//Delete a product
router.delete('/:id', (req, res) =>{
    //get the id and delete by id
    Product.findByIdAndRemove(req.params.id).then(product=>{
        if(product)
            return res.status(200).json({success: true, message: 'The Product is deleted!'})
        else
            return res.status(404).json({success: false, message: 'The Product is not found!'})
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})

//how many products we have in Database- returns a number

router.get(`/get/count`, async (req,res) =>{
    const productCount= await Product.countDocuments()
 
     if(!productCount){
         res.status(500).json({success:false});
     }
     res.send({
         productCount: productCount
     });
 });

 //get featured products
 router.get(`/get/featured/:count`, async (req,res) =>{
    const count= req.params.count ? req.params.count : 0
    const featuredProducts= await Product.find({isFeatured: true}).limit(+count) //converting count to a number
     if(!featuredProducts){
         res.status(500).json({success:false});
     }
     res.send(featuredProducts);
 });

module.exports =router;