const {Comment,Image} =require('../models');

module.exports = {

    async newest (){
        const comments = await Comment.find()
            .populate('imageID')
            .limit(5)
            .sort({timestamp:-1});
        
        console.log(comments);

        return comments;
    }
}