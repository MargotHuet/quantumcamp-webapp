require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db("sample_guides");
    const coll = db.collection("planets");

    const count = await coll.countDocuments();
    console.log("Number of documents in the collection:", count);
    if (count === 0) {
      console.log("The collection is empty.");
    }

    const cursor = coll.find();
    await cursor.forEach(doc => {
      console.log("Document:", doc);
    });

  } finally {
    await client.close();
    console.log("Connection closed.");
  }
}

run().catch(console.dir);
