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

const tinify = require("tinify");
tinify.key = process.env.KEY;
tinify.fromFile("assets/static/img/artists/arcticmonkeys.jpg").toFile("assets/static/img/artists/optimized/arcticoptimized.png");

// TINIFY alle afbeeldingen in 1 keer
const fs = require('fs');

const artistImgPath = "assets/static/img/artists";

let filesArray = fs.readdir(artistImgPath, (err, files) => {
  if(err) {
    console.log('Error reading folder', err);
    return;
  }

  const artistImagesFiles = files.filter(file => {
    const extension = file.split('.').pop().toLowerCase();
    return ['jpg', 'png'].includes(extension);
  })

  artistImagesFiles.forEach(file => { 
    tinify.fromFile("assets/static/img/artists/" + file).toFile("assets/static/img/artists/optimized/" + file);
  });
  })


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
    
    const favoriteArtists = {selectedFavoriteArtists}
    
    try {
      await sendFavoriteArtistData(favoriteArtists);

      // Hier de profielData nog toevoegen door die uit de database te halen
      await client.connect();

      const profileDataCollection = client.db(dbName).collection(collectionName)
      const userData = await profileDataCollection.findOne({}, { sort: { _id: -1}});
  
      if (userData) {
        const profileData = {
          username: userData.username,
          age: userData.age,
          file: userData.file,
          about: userData.about,
          favoriteGenres:userData.genres
        };
  
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
        // Deze code wordt toegepast als de favoriete artiesten bestaat uit 1 geselecteerde
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
      // res.render("profile", { profileData: profileData, title: "My profile", selectedGenre: allSelectedGenreData, favoriteArtists: favArtistsData, additionFavoriteArtistsData:foundObjectsFromFavoriteArtists });
      res.redirect("/profile");
    } else {
      // res.render("profile", { profileData: null, title: "My profile", selectedGenre: allSelectedGenreData, favoriteArtists: mostRecentFavArtists  });
      res.redirect("/profile");
    }
    } catch (error) {
      console.error("An error occurred while saving the data:", error);
      res.render("error.ejs");
    } 
}

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

//       console.log("The artists are succesfully added to profile", uploadFavoriteArtistsData.insertedId);
//   } catch(err) {
//     console.error("Something went wrong with adding the artists to your profile :(", err);
//   }
// }