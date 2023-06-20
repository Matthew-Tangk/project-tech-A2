require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DB_SIGNIN;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("An error occurred while connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

const dbName = "usersData";
const dbNameEvents = "concertBuddies";
const collectionName = "user";
const collectionEvents = "events";

const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "assets/static/img/profilepic" });
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: true }));
app.listen(3000);

const artists = [
  // ...artists data
];

const profileRoutes = require("./routes/profileRoutes.js");
console.log(profileRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
  res.render("home.ejs", { title: "Concert buddies" });
});

app.get("/personal-info", (req, res) => {
  res.render("make-profile.ejs", {
    username: "",
    age: "",
    tel: "",
    email: "",
    title: "Personal info",
  });
});

app.post("/upload-photo", (req, res) => {
  // ...upload photo route code
});

app.post("/add-bio", upload.single("file"), (req, res) => {
  // ...add bio route code
});

app.post("/add-genres", async (req, res) => {
  // ...add genres route code
});

app.get("/profile", async (req, res) => {
  // ...user profile route code
});

app.get("/upcoming-events", async (req, res) => {
  try {
    const db = client.db(dbNameEvents);
    const collection = db.collection(collectionEvents);
    const eventData = await collection.find({}).toArray();

    const formattedEvents = eventData.map((event) => {
      const options = {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const formattedDate = event.date.toLocaleDateString("nl-NL", options);
      return { ...event, formattedDate };
    });

    console.log("Pulled data from MongoDB:", formattedEvents);

    res.render("upcoming-events.ejs", {
      events: formattedEvents,
      title: "Upcoming events",
    });
  } catch (error) {
    console.error("An error occurred while fetching the data:", error);
    res.render("error.ejs");
  }
});

app.get("/upcoming-events/:date", async (req, res) => {
  try {
    const selectedDate = new Date(req.params.date);
    const db = client.db(dbNameEvents);
    const collection = db.collection(collectionEvents);
    const eventData = await collection.find({ date: selectedDate }).toArray();
    res.json(eventData);
  } catch (error) {
    console.error("An error occurred while fetching the data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use((req, res, next) => {
  res.status(404).render("error.ejs", { title: "not found" });
});
