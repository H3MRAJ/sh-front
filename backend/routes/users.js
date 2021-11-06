const {User}=require('../models/user'); //imports and returns an object
const express = require('express');
const router = express.Router();

router.get(`/`, async (req,res) =>{
    //2 prameters the route itself //and a callback with response which is sent to client when he calls this route
    const userList= await User.find(); //await to get the list populated....async in=s needed now

    if(!userList){
        res.status(500).json({success:false});
    }
    res.send(userList);//sending to front end
})

module.exports = router;
//if we export like this....we have to import like an object