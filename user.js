import express from "express";
import pool from './database.js';

const router = express.Router();

router.get("/:login", async function(req, res) {
  try {
    const sqlQuery = 'SELECT login, password, role FROM user WHERE login=?';
    const rows = await pool.query(sqlQuery, req.params.login);
    res.status(200).json(rows);
    console.log(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  // res.status(200).json({login: req.params.login});
});

export default router;