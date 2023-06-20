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

const tinify = require("tinify");
tinify.key = process.env.KEY;

// TINIFY alle afbeeldingen in 1 keer
const fs = require("fs");

const artistImgPath = "assets/static/img/artists";

let filesArray = fs.readdir(artistImgPath, (err, files) => {
  if (err) {
    console.log("Error reading folder", err);
    return;
  }

  const artistImagesFiles = files.filter((file) => {
    const extension = file.split(".").pop().toLowerCase();
    return ["jpg", "png"].includes(extension);
  });

  artistImagesFiles.forEach((file) => {
    tinify
      .fromFile("assets/static/img/artists/" + file)
      .toFile("assets/static/img/artists/optimized/" + file);
  });
});

exports.addArtists = async (req, res) => {
  try {
    await client.connect();

    const artistCollection = client.db("concertBuddies").collection("artists");

    const allArtistsData = await artistCollection
      .find({}, { name: 1, img: 0, path: 1, _id: 0 })
      .toArray();
      
    res.render("addartists.ejs", {
      title: "Add artists",
      artists: allArtistsData,
    });
  } catch (err) {
    console.error("Something went wrong with sending data to the server", err);
  }
};

exports.profile = async (req, res) => {
  selectedFavoriteArtists = req.body.favoriteartists;

  const favoriteArtists = { selectedFavoriteArtists };

  try {
    await sendFavoriteArtistData(favoriteArtists);

    // Hier de profielData nog toevoegen door die uit de database te halen
    await client.connect();
    const db = client.db("usersData");
    const collection = db.collection("user");

    const userData = await collection.findOne({});

    const profileData = {
      username: userData.username,
      age: userData.age,
      file: userData.file,
      about: userData.about,
    };

    res.render("profile.ejs", {
      title: "My profile",
      profileData: profileData,
    });
  } catch (err) {
    console.error("Something went wrong with sending data to the db", err);
  }
};

const sendFavoriteArtistData = async (data) => {
  try {
    const favoriteArtists = client
      .db("concertBuddies")
      .collection("favoriteArtists");

    const uploadFavoriteArtistsData = await favoriteArtists.insertOne(data);
    console.log(
      "The artists are succesfully added to the database",
      uploadFavoriteArtistsData.insertedId
    );
  } catch (err) {
    console.error(
      "Something went wrong with adding the artists to the database :(",
      err
    );
  }
};
