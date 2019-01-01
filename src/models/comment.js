const {Schema,model} = require('mongoose');
const {ObjectId} = Schema;

const CommentSchema = new Schema({
    imageID:{type:ObjectId, ref:'Image'},
    email:{type:String},
    name:{type:String},
    gravatar:{type:String},
    comment:{type:String},
    timeStamp:{type:Date,default:Date.now},
});

CommentSchema.virtual('image')
  .set(function(image) {
    this._image = image;
  })
  .get(function () {
    return this._image;
  });

module.exports = model('Comment',CommentSchema); 
