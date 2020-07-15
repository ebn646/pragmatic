// Dependencies
import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import session from 'express-session';

import boardsRouter from './controllers/boards.js';
import loginRouter from './controllers/login.js';
import signupRouter from './controllers/signup.js';

// Config
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;
const mongodbURI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/pragmatic';

// Connect to MongoDB via Mongoose
mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.on('error', (err) => console.log(`${err.message} is Mongo not running?`));
db.on('connected', () => console.log('Mongo connected: ', mongodbURI));
db.on('disconnected', () => console.log('Mongo disconnected'));
db.on('open', () => console.log('Connection open'));

// Middleware
app.use(methodOverride('_method')); // allow POST, PUT, and DELETE methods on HTML form
app.use(express.static('public')); // serve static files on public folder
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET || 'SecondBreakfast',
    resave: false,
    saveUninitialized: false,
  })
);

// Routers
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/boards', boardsRouter);
app.get('/', (req, res) => {
  res.redirect('/boards');
});
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Listener
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
