import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

  
const app = express();
const port = 3000;

const db = new pg.Client({
  user : "postgres",
  host : "localhost",
  database : "permalist",
  password:"JASSON17JUNI2006",
  port : 5432,
})

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

async function getItems (){
  const result = await db.query("SELECT * FROM items ORDER BY id ASC");
  let items = [];
  const data = result.rows;
  data.forEach((item) => {
    items.push(item)
  })
  return items ;
}


app.get("/", async (req, res) => {
  const listItem = await getItems();
  res.render("index.ejs" ,{
    listTitle : "Today",
    listItems : listItem
  })
});

app.post("/add", async (req, res) => {
  const input = req.body["newItem"]
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)" ,
    [input]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const userEdit = req.body.updatedItemTitle
  const titleId = updatedItemId
  try {
    await db.query("UPDATE items SET title = $1 WHERE id = $2 ", [userEdit , titleId]);
    res.redirect("/")
  } catch (err) {
    console.log(err);
  }

});

app.post("/delete", async (req, res) => {
  const userDelete = req.body.deleteItemId
  try {
    await db.query("DELETE FROM items WHERE id = $1" , [userDelete]);
    res.redirect("/")
  } catch (error) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
