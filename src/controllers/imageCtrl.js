const path = require('path');
const {randomName} = require('../helpers/libs');  
const fs = require('fs-extra');

const {Image} = require('../models');


const ctrl = {};

ctrl.index = async (req,res)=>{

    const image = await Image.findOne({filename:{$regex:req.params.imageID}});
    res.render('image',{image});
}

ctrl.upload = async (req,res)=>{
    const saveImage = async ()=>{
        
    const imgUrl = randomName();
    const images = await Image.find({filename:imgUrl});

    if(images.length>0){
        saveImage();
    }
    else{
        console.log(imgUrl);
        const imageTempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();    
        const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
        console.log(targetPath);
        if(ext === '.png' || ext === '.png' || ext==='.jpeg' || ext==='.jpg' || ext==='.gif'){
            await fs.rename(imageTempPath,targetPath);
            const newImage = new Image({
                title:req.body.title,
                description:req.body.description,
                filename: imgUrl+ext
            });
    
            const imageSave = await newImage.save();
            res.redirect(`/images/${imgUrl}`)
        }
        else{
            await fs.unlink(imageTempPath);
            res.status(400).send({error:"Format is no valid"})
        }
    
        
        res.send({message:'works'})
    }
}

    saveImage();
}

ctrl.like = (req,res)=>{

}

ctrl.postComment = (req,res)=>{
    
}

ctrl.remove = (req,res)=>{
    
}

module.exports = ctrl;