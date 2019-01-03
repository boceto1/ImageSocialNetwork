const express = require('express');

const configExpress = require('./server/app');

require('./server/config')
const app = configExpress(express());

// Connect database
require('./server/database');

// Starting server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
})
