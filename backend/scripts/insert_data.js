require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri =process.env.MONGODB_URI
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("quantum_camp");
    const coll = db.collection("chapters");

    // insert code goes here
    const docs = [
        {title: "Chapitre 1 : Introduction à l'Informatique Quantique", content: "L\'informatique quantique est une nouvelle façon de traiter l'information en utilisant les principes de la mécanique quantique. Contrairement aux bits classiques (0 ou 1), les qubits peuvent représenter 0, 1, ou les deux à la fois, grâce à la superposition. De plus, les qubits peuvent être intriqués, ce qui signifie que l'état de l'un influence instantanément l'autre. Ces propriétés rendent l'informatique quantique prometteuse pour résoudre des problèmes complexes beaucoup plus rapidement que les ordinateurs classiques. Ce cours vous introduira à ces concepts de manière simple et accessible. Explorons ensemble ce monde fascinant !", course_id: , order: 1, is_finished: false},
        {title: "Wild2", content: "81P/Wild", course_id: , order: 2, is_finished: false},
        {title: "Comet Hyakutake", content: "C/1996 B2", course_id: , order: 3, is_finished: false}
      ];
    const result = await coll.insertMany(docs);
    // display the results of your operation
    console.log(result.insertedIds);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
