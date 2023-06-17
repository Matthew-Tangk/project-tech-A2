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


exports.invites = async(req, res) => {
    try {
        await client.connect();

        const invitesCollection = client.db('concertBuddies').collection('invites');

        const allInvitesData = await invitesCollection.findOne();
        console.log(allInvitesData);

        res.render('invites.ejs', {
            title:"Invites",
            invites: allInvitesData
        });
    } catch(err) {
        console.error("Something went wrong with sending data to the server", err)
    }

}