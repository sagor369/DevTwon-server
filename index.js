const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.MDB_User}:${process.env.MDB_Pass}@cluster0.nsogw9w.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    const productsCollection = client.db("DevTwon").collection("Products");

    await client.connect();
    
    // all product API 
    app.get("/products", async(req, res)=>{
        const result = await productsCollection.find().toArray()
        res.send({success: true, data: result})
    })

    app.get("/product/:category", async(req, res)=>{
        const category = req.params.category
        const query = {
            category: category 
        }
        const result = await productsCollection.find(query).toArray()
        res.send({success: true, data: result})
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });