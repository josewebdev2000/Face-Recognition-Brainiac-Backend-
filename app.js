import express  from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();

// Environment variables
const PORT = process.env.PORT;
const DBURL =  process.env.DBURL;

const APIENV = {
    USER_ID: process.env.USER_ID,
    PAT: process.env.PAT,
    APP_ID: process.env.APP_ID,
    MODEL_ID: process.env.MODEL_ID,
    MODEL_VERSION_ID: process.env.MODEL_VERSION_ID
};

// Custom modules
import webRequest  from './APIRequest.mjs';

// Controllers for HTTP routes
import handleRegister  from './register.mjs';
import  handleSignIn  from './signin.mjs';
import  handleProfile  from './profile.mjs';
import { handleAPIRequest, handleImage } from './image.mjs';


const db = knex({
    client: 'pg',
    connection: DBURL
});

const app = express();

// Allow the server to read the body of the request and to configure its JSON
app.use(express.urlencoded({extended: false}));
app.use(express.json())

// Allow CORS in your app
app.use(cors());

// Configure GET route for 
app.get('/', (req, res) => res.send('all good'));

// Configure POST route for /signin
app.post('/signin', (req, res) => handleSignIn(req, res, db, bcrypt));

// Configure GET route for /profile
app.get('/profile/:id', (req, res) => handleProfile(req, res, db));

// Configure POST route for /register
app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));

// Configure POST route for /image
app.post('/image', (req, res) => handleAPIRequest(req, res, APIENV, fetch, webRequest));

// Configure PUT route for /image
app.put('/image', (req, res) => handleImage(req, res, db));


// Get server running on port 8080
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});

/* Routes
/ -> this is working
/signin           --> POST = success/fail
/register         --> POST = user
/profile/:userId  --> GET = user 
/image            --> PUT --> 
*/