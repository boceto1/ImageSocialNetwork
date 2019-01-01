const path = require('path');
const {
    randomName
} = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');

const {
    Image,
    Comment
} = require('../models');


const ctrl = {};

ctrl.index = async (req, res) => {

    const viewModel = {
        image: {},
        comments: {}
    };

    const image = await Image.findOne({
        filename: {
            $regex: req.params.imageID
        }
    });

    if (image) {
        image.views = image.views + 1;
        await image.save();
        const comments = await Comment.find({
            imageID: image._id
        });
        viewModel.image = image;
        viewModel.comments = comments;
        res.render('image', viewModel);
    } else {
        res.redirect('/');
    }
}

ctrl.upload = async (req, res) => {
    const saveImage = async () => {

        const imgUrl = randomName();
        const images = await Image.find({
            filename: imgUrl
        });

        if (images.length > 0) {
            saveImage();
        } else {
            console.log(imgUrl);
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
            console.log(targetPath);
            if (ext === '.png' || ext === '.png' || ext === '.jpeg' || ext === '.jpg' || ext === '.gif') {
                await fs.rename(imageTempPath, targetPath);
                const newImage = new Image({
                    title: req.body.title,
                    description: req.body.description,
                    filename: imgUrl + ext
                });

                const imageSave = await newImage.save();
                res.redirect(`/images/${imgUrl}`)
            } else {
                await fs.unlink(imageTempPath);
                res.status(400).send({
                    error: "Format is no valid"
                })
            }


            res.send({
                message: 'works'
            })
        }
    }

    saveImage();
}

ctrl.like = async (req, res) => {

    const image = await Image.findOne({
        filename: {
            $regex: req.params.imageID
        }
    }); 

    if(image){
        image.likes = image.likes +1;
        await image.save();
        res.json({likes:image.likes})
    }else{
        res.status(404).json({error:'Image Not Found'})
    }

}

ctrl.postComment = async (req, res) => {
    const image = await Image.findOne({
        filename: {
            $regex: req.params.imageID
        }
    });

    if (image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.imageID = image._id;
        await newComment.save();
        return res.redirect(`/images/${image.uniqueId}`)
    } else {
        return res.redirect('/')
    }
}

ctrl.remove = async (req, res) => {
    
   const image = await Image.findOne({filename:{$regex:req.params.imageID}})

   if(image){
       await fs.unlink(path.resolve(`./src/public/upload/${image.filename}`));
       await Comment.deleteOne({imageID:image._id});
       await image.remove();
       res.json({ok:true,message:'The photo was deleted.'})
   }
}

module.exports = ctrl;