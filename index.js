import express from "express";
import router from "./user.js";
import dotenv from "dotenv";

dotenv.config({path: '.env-local'});

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.status(200).send({name: "name", test: true});
});

app.use("/login", router);

app.listen(PORT, () => console.log(`SERVER STARTED ${PORT}`));

// app.post("/create", async function(req, res) {
//   try {
//     const {login, password, role} = req.body;
//     const sqlQuery = "INSERT INTO user (login, password, role) VALUES(?,?,?)";
//     const result = await pool.query(sqlQuery, [login, password, role]);
//     console.log(result);

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(400).send(error.message)
//   }
// });