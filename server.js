require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Routes Controllers
const user = require('./controllers/user.contoller');
const main = require('./controllers/main.controller');

// EJS Config
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Session Config
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    httpOnly: true,
    secure: false,
    resave: false,
    cookie: { 
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 70,
        sameSite: 'strict'
    },
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        ttl: 1000 * 60 * 60 * 70,
        autoRemove: 'native',
        touchAfter: 24 * 3600
    }),
}));


// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.use('/', user);
app.use('/', main);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})