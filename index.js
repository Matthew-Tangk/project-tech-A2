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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    console.log("Finally it works");
  }
}

run().catch(console.dir);

const dbName = "usersData";
const collectionName = "user";

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

// Array with data from artist and bands
const artists = [
  { id: 1, name: "Sleep token", image: "/static/img/artists/sleeptoken.jpg" },
  { id: 2, name: "PVRIS", image: "/static/img/artists/pvris.jpg" },
  {
    id: 3,
    name: "Arctic monkeys",
    image: "/static/img/artists/arcticmonkeys.jpg",
  },
  { id: 4, name: "Kovacs", image: "/static/img/artists/kovacs.jpg" },
  {
    id: 5,
    name: "Melanie Martinez",
    image: "/static/img/artists/melaniemartinez.jpg",
  },
  {
    id: 6,
    name: "Bring me the horizon",
    image: "/static/img/artists/bmth.jpg",
  },
  { id: 7, name: "Doja Cat", image: "/static/img/artists/dojacat.jpg" },
  { id: 8, name: "Grandson", image: "/static/img/artists/grandson.jpg" },
  { id: 9, name: "Ashnikko", image: "/static/img/artists/ashnikko.jpg" },
  { id: 10, name: "Inhaler", image: "/static/img/artists/inhaler.jpg" },
  { id: 11, name: "NF", image: "/static/img/artists/nf.jpg" },
  { id: 12, name: "Nothing but thieves", image: "/static/img/artists/nbt.jpg" },
  { id: 13, name: "Cassyette", image: "/static/img/artists/cassyette.jpg" },
  {
    id: 14,
    name: "Chase Atlantic",
    image: "/static/img/artists/chaseatlantic.jpg",
  },
  {
    id: 15,
    name: "Palaye Royale",
    image: "/static/img/artists/palayeroyale.jpg",
  },
  { id: 16, name: "Polyphia", image: "/static/img/artists/polyphia.jpg" },
  { id: 17, name: "Maneskin", image: "/static/img/artists/maneskin.jpg" },
  { id: 18, name: "Bad omens", image: "/static/img/artists/badomens.jpg" },
];

const profileRoutes = require("./routes/profileRoutes.js");
console.log(profileRoutes);
app.use("/profile", profileRoutes);

// Home page
app.get("/", (req, res) => {
  res.render("home.ejs", { title: "Concert buddies" });
});

// Home page
app.get("/upcoming-events", (req, res) => {
  res.render("upcoming-events.ejs", { title: "Upcoming events" });
});

// Make new profile page
app.get("/personal-info", (req, res) => {
  res.render("make-profile.ejs", {
    username: "",
    age: "",
    tel: "",
    email: "",
    title: "Personal info",
  });
});

// Upload profile picture page
app.post("/upload-photo", (req, res) => {
  const { username, age, tel, email } = req.body;
  res.render("upload-picture.ejs", {
    username,
    age,
    tel,
    email,
    title: "Upload photo",
  });
});

// Fill in about info
app.post("/add-bio", upload.single("file"), (req, res) => {
  const { username, age, tel, email, about } = req.body;
  const picture = req.file.filename;
  console.log(picture);
  res.render("make-about.ejs", {
    username,
    age,
    tel,
    email,
    picture,
    about,
    title: "Add bio",
  });
});

// Select genres
app.post("/add-genres", async (req, res) => {
  const { username, age, tel, email, file, about } = req.body;

  const userData = {
    username: username,
    age: age,
    tel: tel,
    email: email,
    file: file,
    about: about,
  };

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.insertOne(userData);

    console.log("User data successfully saved in MongoDB");


    const genreCollection = client.db('concertBuddies').collection('genres')
    const allGenreData = await genreCollection.find({}).toArray();

    res.render("genres.ejs", { title: "Add genres", genres: allGenreData });
  } catch (error) {
    console.error("An error occurred while saving the data:", error);
    res.render("error.ejs");
  } finally {
    await client.close();
  }
});


// User profile
app.get("/profile", async (req, res) => {
  try {
    await client.connect();

    const profileDataCollection = client.db(dbName).collection(collectionName)
    const allProfileData = await profileDataCollection.find({}).toArray();
    const userData = allProfileData[allProfileData.length - 1];

    if (userData) {
      const profileData = {
        username: userData.username,
        age: userData.age,
        file: userData.file,
        about: userData.about,
      };

    const selectedGenreCollection = client.db('concertBuddies').collection('selectedGenres')
    const allSelectedGenreData = await selectedGenreCollection.find({}).toArray();

    const favoriteArtists = client.db('concertBuddies').collection('favoriteArtists')
    const allFavoriteArtists = await favoriteArtists.find({}).toArray();
    const mostRecentFavArtists = allFavoriteArtists[allFavoriteArtists.length - 1];
    const favArtistsData = mostRecentFavArtists.selectedFavoriteArtists;

    console.log("data"+favArtistsData);

    res.render("profile", { profileData: profileData, title: "My profile", selectedGenre: allSelectedGenreData, favoriteArtists: favArtistsData });
    console.log(mostRecentFavArtists);
  } else {
    res.render("profile", { profileData: null, title: "My profile", selectedGenre: allSelectedGenreData, favoriteArtists: mostRecentFavArtists  });
  }
  } catch (error) {
    console.error("An error occurred while saving the data:", error);
    res.render("error.ejs");
  } finally {
    await client.close();
  }
});




// 404 error if page is not found
app.use((req, res, next) => {
  res.status(404).render("error.ejs", { title: "not found" });
});