const {Schema,model} = require('mongoose');
const {ObjectId} = Schema;

const CommentSchema = new Schema({
    image:{type:ObjectId, ref:'Image'},
    email:{type:String},
    name:{type:String},
    gravatar:{type:String},
    comment:{type:String},
    timeStamp:{type:Date,default:Date.now},
});

module.exports = model('Comment',CommentSchema); 
