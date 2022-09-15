import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database.js';

const userRoute = Router();

userRoute.get('/signin', async function(req, res) {
  try {
    const {login, password} = req.body;

    const sqlQuery = `SELECT login, password, role FROM user WHERE login="${login}"`;
    const rows = await pool.query(sqlQuery, login);

    if(!rows?.length) {
      res.status(401).send({status: 401, message: "User not found"});
    } else {
      const isValid = await bcrypt.compare(password, rows[0].password);
      if(isValid) {
        const token = jwt.sign(
          {
            login: rows[0].login,
            role: rows[0].role,
          },
          process.env.JWT,
          { expiresIn: 120*120 });

        res.status(200).json({
          status: 200,
          token: `Bearer ${token}`,
        });
      } else {
        res.status(401).send({status: 401, message: "Password invalid"});
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userRoute.get('/all', async function(req, res) {
  try {
    const sqlQuery = `SELECT login, password, role FROM user`;
    const rows = await pool.query(sqlQuery);
    res.status(200).json({
      status: 200,
      rows,
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default userRoute;