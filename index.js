// user name : raihanahmed01973
// password : xBspLWKoP6VHz5q5

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.Port || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// create database
const uri =
  "mongodb+srv://raihanahmed01973:xBspLWKoP6VHz5q5@crud-client-cluster.trwhe4u.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// app.get("/users", (req, res) => {
//   const data = [
//     { name: "raihan", email: "rai@gmail.com" },
//     { name: "snigdha", email: "snigdha@gmail.com" },
//   ];
//   res.send(data);
// });

async function run() {
  try {
    const database = client.db("insertDB");
    const Allproducts = database.collection("products");

    // create data for database
    app.post("/users", async (req, res) => {
      const products = req.body;
      const result = await Allproducts.insertOne(products);
      res.send(result);
      console.log(result);
    });

    // read data from databse
    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = Allproducts.find(query);
      const products = await cursor.toArray();
      res.send(products);
      console.log(products);
    });

    //read singel data from databse
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await Allproducts.findOne(query);
      res.send(result);
    });

    // delete data from database
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await Allproducts.deleteOne(query);
      res.send(result);
      console.log(id);
    });

    // update data in database
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const products = req.body;
      const updateDoc = {
        $set: {
          name: products.name,
          price: products.price,
          quantity: products.quantity,
        },
      };
      const result = await Allproducts.updateOne(query, updateDoc, options);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);
