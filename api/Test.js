import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

app.post("/leetcode", async (req, res) => {
  try {
    console.log(req.body);
    
    const response = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
const PORT = 4000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
