const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ybtjl3s.mongodb.net/?retryWrites=true&w=majority`;
// const uri =
//   "mongodb+srv://$Kh_Sultana_Kitchen:5e9EHkaJMuu4kUb2@cluster0.ybtjl3s.mongodb.net/?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const itemsCollection = client.db("SultanaKitchen").collection("FoodItems");
  } finally {
  }
}

run().catch((err) => console.log(err));
app.get("/items", async (req, res) => {
  res.send("'Nothing");
});

app.get("/", (req, res) => {
  res.send("Kh Sultana Kitchen API is Running");
});

app.listen(port, () => {
  console.log("Port Is Listening");
});
