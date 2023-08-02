const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "bonjour joseph" });
});

app.listen(port, () => {
  console.log(`the server is listenning port: ${port}`);
});
