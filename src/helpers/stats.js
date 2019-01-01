const {
    Comment,
    Image
} = require('../models')

const imageCounter = async () => await Image.countDocuments()

const commentsCounter = async () => await Comment.countDocuments()

async function imageTotalViewsCounter  (){
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: {
                $sum: '$views'
            }
        }
    }]);
    let viewsTotal = 0;
    if (result.length > 0) {
        viewsTotal += result[0].viewsTotal;
    }   
    return viewsTotal;
}

async function likesTotalCouter (){

    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            likesTotal: {
                $sum: '$likes'
            }
        }
    }]);

    let likesTotal = 0;
    if (result.length > 0) {
        likesTotal += result[0].likesTotal;
    }
    return likesTotal;

}

module.exports = async () => {
    
    const result = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCouter()
    ])

    return {
        images: result[0],
        comments : result[1],
        views: result[2],
        likes: result[3]
    }
}