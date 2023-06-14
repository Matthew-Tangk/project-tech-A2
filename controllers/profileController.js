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
    

    //DIT is optie1
    // artists.forEach(artist => {

        // const sourceFile = tinify.fromFile(artist.path);
        // sourceFile.toFile(artist.name + "optimized");
        // console.log(sourceFile);
    // })

    // const sourceFile = tinify.fromFile("arcticmonkeys.jpg");
    // sourceFile.toFile("optimizedarcticmonkeys.jpg");

    //OPTIE 2
    // const source = tinify.fromFile("large.jpg");
    // const resized = source.resize({
    //     method: "fit",
    //     width: 150,
    //     height: 100
    // });
    // resized.toFile("thumbnail.jpg");
}