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
tinify.key = "9v2Bl9fzC6qgqXWvTJ0sCSt19L33nt2M";
tinify.fromFile("assets/static/img/artists/arcticmonkeys.jpg").toFile("assets/static/img/artists/optimized/arcticoptimized.png");

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

