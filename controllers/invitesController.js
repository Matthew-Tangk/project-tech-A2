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
        const pendingData = await invitesCollection.find({status:"Pending"}).toArray();

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

exports.updateInviteStatus = async (req, res) => {
    try {
        await client.connect();

        console.log('connected');
        const invitesCollection = client.db('concertBuddies').collection('invites');
        await invitesCollection.updateOne({status: 'New'}, {$set: {status: 'Accepted'}});
        console.log('updated');

        res.sendStatus(200);

    } catch (error) {
        console.error('An error occured while updating the invite info', error);
        res.sendStatus(500);
    }
} 
// DIT OMSCHRIJVEN NAAR CONTROLLER EN ROUTE
// app.post('/update-object', async (req, res) => {
//     try {
//       // Connect to MongoDB
//       const client = await MongoClient.connect(databaseUrl);
  
//       // Access the collection and perform the update operation
//       const collection = client.db('yourDatabase').collection('yourCollection');
//       await collection.updateOne({ /* your update condition */ }, { $set: { /* updated properties */ } });
  
//       // Close the database connection
//       await client.close();
  
//       // Send a success response
//       res.sendStatus(200);
//     } catch (error) {
//       console.error('An error occurred while updating the object:', error);
//       res.sendStatus(500);
//     }
//   });