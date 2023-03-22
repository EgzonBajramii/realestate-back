var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const apartmentRoutes = require('./routes/apartment.routes.js')
const houseRoutes = require('./routes/house.routes.js')
const propertyRoutes = require('./routes/property.routes')
const lokaleRoutes = require('./routes/lokale.routes');

var app = express();
const cors = require('cors');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apartment', apartmentRoutes);
app.use('/house',houseRoutes)
app.use('/property',propertyRoutes);
app.use('/lokale',lokaleRoutes);
module.exports = app;
