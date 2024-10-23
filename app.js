const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { connectToDB } = require("./connection");
const {
    checkForAuthenticationCookie,
} = require("./middlewares/authentication");
const Blog = require("./models/blog");

const app = express();

connectToDB(process.env.MONGO_URL)
    .then(() => console.log("Mongo DB connected"))
    .catch((err) =>
        console.log(`Error occured while connecting to DB: ${err}`)
    );

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
    const blogs = await Blog.find({});
    res.render("home", {
        user: req.user,
        blogs: blogs,
    });
});

app.listen(process.env.PORT, () =>
    console.log(`Server started at port: ${process.env.PORT}`)
);
