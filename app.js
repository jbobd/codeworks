const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

const db = require("./config/sequelize");

const app = express();

//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//Index Router
app.get("/", (req, res) => res.render("index", { layout: "landing" }));

//Jobs Route
app.use("/jobs", require("./routes/jobs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
