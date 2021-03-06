const mongoose = require('mongoose');
const path = require('path');

const {Schema} = mongoose;

const ImageSchema = new Schema({
    title:{type:String},
    description:{type:String},
    filename:{type:String},
    views:{type:Number,default:0},
    likes:{type:Number,default:0},
    timeStamp:{type:Date,default:Date.now}

});

// Remove extension to image
ImageSchema.virtual('uniqueId')
    .get(function(){
        return this.filename.replace(path.extname(this.filename),'')
    });


module.exports = mongoose.model('Image',ImageSchema);

