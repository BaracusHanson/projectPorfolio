const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/admin.db");
const { checkLogin } = require("./controllers/adminlinLogin");
dotenv.config();

//connection a la BDD
connectDB.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());

const verifAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({
      Error: "Vous devez vous authentifier!",
    });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({
          Error: "Vous devez vous authentifier ",
        });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

app.get("/dashboard", verifAdmin, (req, res) => {
  res.json({ Status: "Success", name: req.name });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.use("/register", require("./routes/admin.routes"));
app.use("/login", checkLogin);

app.listen(process.env.PORT, () => {
  console.log(`the server is listenning port: ${process.env.PORT}`);
});
