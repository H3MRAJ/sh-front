

const {Category}=require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req,res) =>{
    //2 prameters the route itself //and a callback with response which is sent to client when he calls this route
    const categoryList= await Category.find(); //await to get the list populated....async in=s needed now

    if(!categoryList){
        res.status(500).json({success:false});
    }
    res.send(categoryList);//sending to front end
});

module.exports = router;