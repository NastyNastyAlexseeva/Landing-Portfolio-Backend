import express from "express";
import dotenv from "dotenv";
import passport from 'passport';
import routes from './routes/routes.js';
import passJwt from './middleware/passport.js';

dotenv.config({path: '.env-local'});

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
passJwt(passport);

routes(app);

app.listen(PORT, () => console.log(`SERVER STARTED ${PORT}`));