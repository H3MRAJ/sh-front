const mongoose=(require('mongoose'));

const userSchema = mongoose.Schema(
    {
        //creating Schema
        name: String,
        image: String,
        countInStock: Number
    }
)

//creating model
exports.User= mongoose.model('User',userSchema);