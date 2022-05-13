const express = require('express');
const app = express();
const morgan = require('morgan');

//settings
app.set('port', process.env.PORT || 3000); 

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes
app.use('/api/users',require('./routes/users'));

// Start the server
app.listen(3000, ()=>{
    console.log(`Server on port ${3000}`);
});