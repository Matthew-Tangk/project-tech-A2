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
const uglifycss = require("uglifycss");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: true }));
app.listen(3000);

// Uglifycss
const inputFiles = ["assets/css/style.css", "assets/css/addartists.styles.css", "assets/css/invites.styles.css", "assets/css/my-events.css", "assets/css/registration.css", "assets/css/upcoming-events.css" ];
const options = {
  maxLineLen: 500,
  expandVars: true
};


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

// Add a bio page
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

// Select genres page
app.post("/add-genres", async (req, res) => {
  const { username, age, tel, email, file, about } = req.body;

  try {
    await client.connect();

    const genreCollection = client.db('concertBuddies').collection('genres')
    const allGenreData = await genreCollection.find({}).toArray();

    res.render("genres.ejs", {
      username,
      age,
      tel,
      email,
      file,
      about,
      genres: allGenreData,
      title: "Add genres"
    })
  } catch (error) {
    console.error("An error occurred while saving the data:", error);
  }
});

app.post("/profile", async (req, res) => {
  const { username, age, tel, email, file, about } = req.body;
  const selectedFavoriteGenres = req.body.favoritegenres;

  const favoriteGenres = selectedFavoriteGenres;

  const userDataSend = {
    username: username,
    age: age,
    tel: tel,
    email: email,
    file: file,
    about: about,
    genres: favoriteGenres
  };

  try {
    await sendUserData(userDataSend);

    // Now that userData is stored, retrieve all userData again to render in the profile page
    await client.connect();

    const profileDataCollection = client.db(dbName).collection(collectionName);
    const userData = await profileDataCollection.findOne({}, { sort: { _id: -1 } });

    console.log(userData); // Add this line to check the value of userData

    if (userData) {
      const profileData = {
        username: userData.username,
        age: userData.age,
        file: userData.file,
        about: userData.about,
        genres: userData.genres,
      };

      const allGenreData = profileData.genres

      const favoriteGenres = userData.genres;

      const favArtistsData = null;
      const foundObjectsFromFavoriteArtists = null;

    res.render("genres.ejs", { title: "Add genres", genres: allGenreData });
  }} catch (error) {
    console.error("An error occurred while saving the data:", error);
    res.render("error.ejs");
  }
});

const sendUserData = async (data) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.insertOne(data);
  } catch (err) {
    console.error("Something went wrong with adding the profileinfo to the database :(", err);
  }

}


// User profile
app.get("/profile", async (req, res) => {
  try {
    await client.connect();

    const profileDataCollection = client.db(dbName).collection(collectionName)
    const userData = await profileDataCollection.findOne({}, { sort: { _id: -1}});

    if (userData) {
      const profileData = {
        username: userData.username,
        age: userData.age,
        file: userData.file,
        about: userData.about,
        genres:userData.genres
      };
      
      const favoriteGenres = userData.genres;

    // Retrieve favorite genres from db
    const selectedGenreCollection = client.db('concertBuddies').collection('selectedGenres')
    const allSelectedGenreData = await selectedGenreCollection.find({}).toArray();

    // Retrieve favorite artists from db
    const favoriteArtists = client.db('concertBuddies').collection('favoriteArtists');
    const mostRecentFavArtists = await favoriteArtists.findOne({}, { sort: { _id: -1 } });
    // Write a statement to prevent error when favArtistData is empty
    const favArtistsData = mostRecentFavArtists ? mostRecentFavArtists.selectedFavoriteArtists : [];
    
    const foundObjectsFromFavoriteArtists = [];

    if (Array.isArray(favArtistsData)) {
      const retrieveAdditionalArtistData = favArtistsData.map(artist => {
        const findAllInfoOfFavArtist = async() => { 
           try {
             await client.connect();
             const allArtist = client.db('concertBuddies').collection('artists');
             let nowActiveArtists = await allArtist.find({ name: artist }).toArray();
            foundObjectsFromFavoriteArtists.push(...nowActiveArtists);
          } catch (error) {
            console.error("An error occurred while retrieving the data from the db", error);
          } 
        };
         return findAllInfoOfFavArtist();
       });
       await Promise.all(retrieveAdditionalArtistData);

       } else {
       console.log("KORTE ARRAY VAN 1");
       const findAllInfoOfFavArtist = async() => { 
        try {
           await client.connect();
           const allArtist = client.db('concertBuddies').collection('artists');
          let nowActiveArtists = await allArtist.find({ name: favArtistsData }).toArray();
          foundObjectsFromFavoriteArtists.push(...nowActiveArtists);
         } catch (error) {
           console.error("An error occurred while retrieving the data from the db", error);
         } 
       };
      await findAllInfoOfFavArtist();
     }
    
    res.render("profile", { profileData: profileData, title: "My profile", favoriteGenres: favoriteGenres, favoriteArtists: favArtistsData, additionFavoriteArtistsData:foundObjectsFromFavoriteArtists });
  } else {
    res.render("profile", { profileData: null, title: "My profile", selectedGenre: allSelectedGenreData, favoriteArtists: mostRecentFavArtists  });
  }
  } catch (error) {
    console.error("An error occurred while saving the data:", error);
    res.render("error.ejs");
  } 
});


// 404 error if page is not found
app.use((req, res, next) => {
  res.status(404).render("error.ejs", { title: "not found" });
});


