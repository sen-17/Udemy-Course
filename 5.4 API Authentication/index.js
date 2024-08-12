import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "iHatePostManLOL";
const yourPassword = "IMPOSTMANHATER";
const yourAPIKey = "cfbdc3bf-0b4e-48d3-9b22-40a3ee94430d";
const yourBearerToken = "81507898-5271-4eb9-affd-8d8bdb917865";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random")
    const result = response.data
    res.render("index.ejs" , {content : JSON.stringify(result)});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
  });
}
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
      auth: {
        username : yourUsername,
        password : yourPassword,
      }
    })
      const result = response.data
      res.render("index.ejs" , {content : JSON.stringify(result)});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
  });
  }
 
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/filter?", {
      params: {
        score : 5,
        apiKey : yourAPIKey,
      }
    })
    const result = response.data
    res.render ("index.ejs" , {content : JSON.stringify(result)})
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
  });
  }

  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get ("https://secrets-api.appbrewery.com/secrets/1" , {
      headers : {
        Authorization: `Bearer ${yourBearerToken}`
      }
    })
    const result = response.data
    res.render ("index.ejs" , {content : JSON.stringify(result)})
  } catch (error) {
    res.status(404).send(error.message)
  }
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
