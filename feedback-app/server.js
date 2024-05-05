const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());


const feedbacks = [];

app.post("/feedback", (req, res) => {
  const { name, email, feedback } = req.body;
  if (!name || !email || !feedback) {
    return res.status(400).json({ message: "Missing fields in request body" });
  }

  const newFeedback = {
    id: feedbacks.length + 1,
    name,
    email,
    feedback,
    timestamp: new Date(),
  };
  feedbacks.push(newFeedback);
  res.status(201).json(newFeedback);
});

app.get("/feedback", (req, res) => {
  res.status(200).json(feedbacks);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
