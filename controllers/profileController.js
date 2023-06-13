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

// Array with data from artist and bands 
const artists = [
    {id:1, name: 'Sleep token', image: '/static/img/artists/sleeptoken.jpg', path: '../static/img/artists/sleeptoken.jpg'},
    {id:2, name: 'PVRIS', image: '/static/img/artists/pvris.jpg'},
    {id:3, name: 'Arctic monkeys', image: '/static/img/artists/arcticmonkeys.jpg'},
    {id:4, name: 'Kovacs', image: '/static/img/artists/kovacs.jpg'},
    {id:5, name: 'Melanie Martinez', image: '/static/img/artists/melaniemartinez.jpg'},
    {id:6, name: 'Bring me the horizon', image: '/static/img/artists/bmth.jpg'},
    {id:7, name: 'Doja Cat', image: '/static/img/artists/dojacat.jpg'},
    {id:8, name: 'Grandson', image: '/static/img/artists/grandson.jpg'},
    {id:9, name: 'Ashnikko', image: '/static/img/artists/ashnikko.jpg'},
    {id:10, name: 'Inhaler', image: '/static/img/artists/inhaler.jpg'},
    {id:11, name: 'NF', image: '/static/img/artists/nf.jpg'},
    {id:12, name: 'Nothing but thieves', image: '/static/img/artists/nbt.jpg'},
    {id:13, name: 'Cassyette', image: '/static/img/artists/cassyette.jpg'},
    {id:14, name: 'Chase Atlantic', image: '/static/img/artists/chaseatlantic.jpg'},
    {id:15, name: 'Palaye Royale', image: '/static/img/artists/palayeroyale.jpg'},
    {id:16, name: 'Polyphia', image: '/static/img/artists/polyphia.jpg'},
    {id:17, name: 'Maneskin', image: '/static/img/artists/maneskin.jpg'},
    {id:18, name: 'Bad omens', image: '/static/img/artists/badomens.jpg'},
  ];

const tinify = require("tinify");
tinify.key = "9v2Bl9fzC6qgqXWvTJ0sCSt19L33nt2M";

exports.addArtists = async (req, res) => {
    try {
        await client.connect();

        const artistCollection = client.db('concertBuddies').collection('artists')

        const allArtistsData = await artistCollection.find().toArray();
        console.log(allArtistsData);

        //DATA KRIJG IK NU BINNEN< Nu nog omzetten hieronder in de render dat de data meegerenderd wordt en de afbeelding
        //in de view plaatsen met ejs
        res.render('addartists.ejs', {
            title:"Add artists", 
            items: artists
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