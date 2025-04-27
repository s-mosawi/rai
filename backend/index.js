
import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import smtp from "./smtp.js";

const PORT = 8080;
const app = express();
const listenerCb = () => {
   console.log("application running on port %s, http://localhost:%s", PORT, PORT);	
}
const DATABASE_URL = "mongodb+srv://responsble:Pvhem4m2xamQ1hk8@responsble.trsk4qs.mongodb.net/responsble?retryWrites=true&w=majority";

const client = new MongoClient(DATABASE_URL, {
   serverApi: {
      strict: true,
      deprecationErrors: true,
      version: ServerApiVersion.v1	
   }	
});
let dbClient;

app.use(cors());
app.use(express.json());

app.post("/pledge", async (r, w) => {
   try {
      const { name,  date, signature, email, organisation, city, role } = (r.body || {});
      if (name && signature && email && city && email.includes("@") && email.includes(".")) {
         const pledge = { 
            name,  
            date: date || new Date().toISOString(), signature, 
            email, 
            organisation, 
            city, 
            role 
         } 
         await dbClient.db("responsble").collection("Pledge").insertOne(pledge);  
         await smtp(
            "Congratulations from Responsible AI", 
            email, 
            `  <img src="https://i.ibb.co/TMtG3KT4/IMG-20250421-WA0002.jpg" alt="badge" style="width:100px;height:100px;display:block;margin:auto;" />
               <p>Hey <strong>${name}</strong>! Congratulations for signing the Pledge. Here's the badge that we promised</p>
            `
         );
         w.status(200).json({ ok: true });	
      } else {
         w.status(400).json({ message: "invalid parameters" });
         return;
      }
   } catch(error) {
      console.log(error);
      w.status(500).json({ message: error.message });	
   }	
})

app.get("/pledgecount", async (req, res) => {
  try {
    const count = await dbClient.db("responsble").collection("Pledge").countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error counting documents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

console.log("Connecting to db.....");
dbClient = await client.connect();
console.log("Starting server....");
app.listen(PORT, listenerCb)
