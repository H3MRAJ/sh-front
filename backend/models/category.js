const mongoose=(require('mongoose'));

const categorySchema = mongoose.Schema(
    {
        //creating Schema
        
    }
)

//creating model
exports.Category= mongoose.model('Category',categorySchema);