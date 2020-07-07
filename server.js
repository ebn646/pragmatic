// Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const projectsRouter = require('./controllers/projects.js');

// Config
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;
const mongodbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'pragmatic';

// Connect to MongoDB via Mongoose
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true});
db.on('error', (err) => console.log(err.message + 'is Mongo not runnning?'));
db.on('connected', () => console.log('Mongo connected: ', mongodbURI));
db.on('disconnected', () => console.log('Mongo disconnected'));
db.on('open', () => console.log('Connection open'));

// Middleware
app.use(methodOverride('_method')); // allow POST, PUT, and DELETE methods on HTML form
app.use(express.static('public')); // serve static files on public folder
app.use(express.urlencoded({extended: true}));

// Routers
app.use('/projects', projectsRouter);

// Listener
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`));
