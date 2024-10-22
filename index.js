const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const { connectToDB } = require("./connection");

const app = express();
const port = 8000;

connectToDB("mongodb://127.0.0.1:27017/blogify")
    .then(() => console.log("Mongo DB connected"))
    .catch((err) =>
        console.log(`Error occured while connecting to DB: ${err}`)
    );

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use("/user", userRoute);

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(port, () => console.log(`Server started at port: ${port}`));
