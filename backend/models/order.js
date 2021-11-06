const mongoose=(require('mongoose'));

const orderSchema = mongoose.Schema(
    {
        //creating Schema
        
    }
)

//creating model
exports.Order= mongoose.model('Order',orderSchema);