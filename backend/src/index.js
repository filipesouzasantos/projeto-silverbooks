const RouteBook = require('./routes/RouteBook');
const RouteUser = require('./routes/RoutesUser');
const PORT = process.env.PORT || 3001;
const express =require('express');

const cors = require('cors');
const { connect } = require('mongoose');
const server = express();


//configs
server.use(cors());
server.use(express.json());


//routes
server.use('/',RouteBook);
server.use('/user',RouteUser);




server.listen(PORT,()=>console.log('connect...'));

