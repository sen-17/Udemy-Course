import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const db = new pg.Client({
   user : "postgres",
   host : "localhost",
   database : "authentication",
   password : "JASSON17JUNI2006",
   port : 5432
})

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username
  const password = req.body.password

  try {
    const checkEmail = await db.query("SELECT * FROM users WHERE email = $1" , [email])

    if (checkEmail.rows.length > 0){
      res.send('Email already exist. Try logging in')
    } else {
      const result = await db.query("INSERT INTO users (email , password) VALUES ($1 , $2)" , [email , password])
      res.render("secrets.ejs")
    }
  } catch (error) {
    console.log(error)
  }

});

app.post("/login", async (req, res) => {
  const email = req.body.username
  const password = req.body.password

  try {
     
  const checkRegistered = await db.query("SELECT * FROM users WHERE email = $1", [email])

  if (checkRegistered.rows.length > 0) {
      const user = checkRegistered.rows[0];
      const storedPassword = user.Password
    if (storedPassword === password){
      res.render("secrets.ejs")
    } else {
      res.send ("Incorret Password")
    }
  } else {
    res.send("User not found")
  }
  } catch (error) {
    console.log(error)
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
