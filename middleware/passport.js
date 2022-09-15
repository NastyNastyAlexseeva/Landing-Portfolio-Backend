import { Strategy, ExtractJwt } from 'passport-jwt';
import pool from '../database.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT,
};

const passJwt = (passport) => {
  passport.use(new Strategy(options, (payload, done) => {
    try {
      const sqlQuery = `SELECT login, role FROM user WHERE login="${payload.login}"`;
      const rows = pool.query(sqlQuery, payload.login);
  
      if(rows) {
        done(null, rows);
      } else {
        done(null, false);
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  }));
};

export default passJwt;