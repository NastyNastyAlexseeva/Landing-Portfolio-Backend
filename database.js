import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config({path: '.env-local'});

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  jwt: process.env.JWT,
  connectionLimit: 5,
});

pool.getConnection()
  .then(conn => {
    console.log("connected ! connection id is " + conn.threadId);
    conn.release();
  })
  .catch(err => {
    console.log("not connected due to error: " + err);
  });

export default pool;