const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_SIGNIN;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    console.log("Finally it works");
  }
}

run().catch(console.dir);

const tinify = require("tinify");
tinify.key = process.env.KEY;
// tinify.fromFile("assets/static/img/artists/arcticmonkeys.jpg").toFile("assets/static/img/artists/optimized/arcticoptimized.png");

// POGING2
const path = require('path');
const fs = require('fs');

const artistImgPath = "assets/static/img/artists";

let filesArray = fs.readdirSync(artistImgPath);

filesArray.forEach(file => { 
  tinify.fromFile("assets/static/img/artists/" + file).toFile("assets/static/img/artists/optimized/" + file);
});


// Code for reading all img files
// VithalReddy (2018) Medium.com
// https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5
//requiring path and fs modules
// const path = require('path');
// const fs = require('fs');

// //joining path of directory 
// const artistImgPath = path.join(__dirname, '../assets/static/img/artists');

// //passsing directoryPath and callback function
// fs.readdir(artistImgPath, async (err, files) => {
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     }

//     files.forEach(file => {
//       console.log(file); 
//       console.log("filename" + artistImgPath + "/"+file)
//     })
// });


exports.addArtists = async (req, res) => {
  try {
      await client.connect();

      const artistCollection = client.db('concertBuddies').collection('artists')

      const allArtistsData = await artistCollection.find({ }, 
        { name: 1, img: 0, path:1, _id: 0 }
        ).toArray();

      //DATA KRIJG IK NU BINNEN< Nu nog omzetten hieronder in de render dat de data meegerenderd wordt en de afbeelding
      //in de view plaatsen met ejs
      res.render('addartists.ejs', {
          title:"Add artists", 
          artists: allArtistsData
      });

  } catch (err) {
      console.error("Something went wrong with sending data to the server", err)
  }
}

exports.profile = async (req, res) => {
    selectedFavoriteArtists = req.body.favoriteartists;
    
    const favoriteArtists = {selectedFavoriteArtists}
    
    try {
      await sendFavoriteArtistData(favoriteArtists);

      // Hier de profielData nog toevoegen door die uit de database te halen
      await client.connect();
      const db = client.db('usersData');
      const collection = db.collection('user');
  
      const userData = await collection.findOne({});
  
      const profileData = {
          username: userData.username,
          age: userData.age,
          file: userData.file,
          about: userData.about,
        };
      
      res.render('profile.ejs', {
        title:"My profile",
        profileData: profileData
      })
    } catch(err) {
      console.error("Something went wrong with sending data to the db", err);
    }
}

const sendFavoriteArtistData = async (data) => {
  try {
    const favoriteArtists = client
    .db("concertBuddies")
    .collection("favoriteArtists");

    const uploadFavoriteArtistsData = await favoriteArtists.insertOne(data);
    console.log("The artists are succesfully added to the database", uploadFavoriteArtistsData.insertedId);
  } catch (err) {
    console.error("Something went wrong with adding the artists to the database :(", err);
  }
}