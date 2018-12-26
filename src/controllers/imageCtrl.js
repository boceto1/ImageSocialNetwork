const path = require('path');
const {randomName} = require('../helpers/libs');  
const ctrl = {};

ctrl.getImage = (req,res)=>{
    res.send('Index page')
}

ctrl.upload = (req,res)=>{

    const imgUrl = randomName();
    console.log(imgUrl);
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();    
    const targetPath = path.resolve(`src/public/upload/test${ext}`);


    
    res.send({message:'works'})


}

ctrl.like = (req,res)=>{

}

ctrl.postComment = (req,res)=>{
    
}

ctrl.remove = (req,res)=>{
    
}

module.exports = ctrl;