const {Comment} =require('../models');

module.exports = {

    async newest (){
        const comments = await Comment.find()
            .populate('image')
            .limit(2)
            .sort({timestamp:-1});
        
        console.log(comments);

        return comments;
    }
}