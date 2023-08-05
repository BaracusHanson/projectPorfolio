const express = require("express");
const cors = require("cors");
require("./config/admin.db").connect();
const port = process.env.PORT;
const adminController = require("./controllers/admin.controller");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin.routes");
require("dotenv").config();
const authController = require("./controllers/auth.controller");

const app = express();
app.use(cookieParser());
app.use;
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use("/register", adminRoutes);
app.use("/dashboard", adminRoutes);
app.post("/login", adminController.loginAdmin);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
