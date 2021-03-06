const express = require('express');
const router = express.Router();

const homeCtrl = require('../controllers/homeCtrl');
const imageCtrl = require('../controllers/imageCtrl');


module.exports = app =>{
    
    router.get('/',homeCtrl.index);
    router.get('/images/:imageID',imageCtrl.index);
    router.post('/images',imageCtrl.upload);
    router.post('/images/:imageID/like',imageCtrl.like);
    router.post('/images/:imageID/comments',imageCtrl.postComment);
    router.delete('/images/:imageID',imageCtrl.remove);

















    

    app.use(router);
}