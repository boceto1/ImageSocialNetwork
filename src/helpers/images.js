const {Image} = require('../models');

module.exports ={

    async popular(){
        images = await Image.find()
            .limit(9)
            .sort({likes:-1})
        return images;
    }
}