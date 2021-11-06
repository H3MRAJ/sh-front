
const mongoose=(require('mongoose'));

const productSchema = mongoose.Schema(
    {
        //creating Schema
        name: String,
        image: String,
        countInStock: {
            type: Number,
            required: true
        }
    }
)

//creating model
exports.Product= mongoose.model('Product',productSchema);