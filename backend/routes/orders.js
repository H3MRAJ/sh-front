const {Order}=require('../models/order');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req,res) =>{
    //2 prameters the route itself //and a callback with response which is sent to client when he calls this route
    const orderList= await Order.find(); //await to get the list populated....async in=s needed now

    if(!orderList){
        res.status(500).json({success:false});
    }
    res.send(orderList);//sending to front end
});

module.exports = router;