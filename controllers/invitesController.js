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

        const newInvitesData = await invitesCollection.find({status:"New"}).toArray();
        const waitingForAcceptationInvitesData = await invitesCollection.find({status:"Waiting for acceptation"}).toArray();
        const pendingData = await invitesCollection.find({status:"Pending"});
        console.log(newInvitesData);
        console.log(waitingForAcceptationInvitesData)

        res.render('invites.ejs', {
            title:"Invites",
            newInvites: newInvitesData,
            waitingForAcceptationInvite: waitingForAcceptationInvitesData,
            pendingInvite: pendingData
        });
    } catch(err) {
        console.error("Something went wrong with sending data to the server", err)
    }

}