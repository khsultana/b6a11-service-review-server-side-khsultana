const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const orderCollection = client.db("SultanaKitchen").collection('orders')
    app.get("/items", async (req, res) => {
      const query = {};
      const cursor = itemsCollection.find(query);
      const items = await cursor.toArray();
      res.send(items);
    });

    app.get("/items/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const item = await itemsCollection.findOne(query);
      res.send(item);
    });

    // order API Item

    app.post('/orderItem', async (req, res) => {

      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.send(result)
    })

  } finally {
  }
}

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Kh Sultana Kitchen API is Running");
});

app.listen(port, () => {
  console.log("Port Is Listening");
});
