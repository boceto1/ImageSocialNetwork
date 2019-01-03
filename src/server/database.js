const mongoose = require('mongoose');

mongoose.connect(process.env.URLDB,{
    useNewUrlParser:true
})
    .then(db => console.log('DB is connected'))
    .catch(err=>console.err(err));
