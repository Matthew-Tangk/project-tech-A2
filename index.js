require('dotenv').config();

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

const dbName = 'usersData'; 
const collectionName = 'user';

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }))
app.listen(3000)

// Array with data from artist and bands 
const artists = [
  {id:1, name: 'Sleep token', image: '/static/img/artists/sleeptoken.jpg'},
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

const profileRoutes = require('./routes/profileRoutes.js');
console.log(profileRoutes);
app.use('/profile', profileRoutes);

// Make new profile page
app.get('/new-profile',(req, res) => {
  res.render('make-profile.ejs', { username: '', age: '', tel: '', title:"New profile" });
});

// Upload profile picture page
app.post('/upload-picture',(req, res) => {
  const { username, age, tel, file } = req.body;
  res.render('upload-picture.ejs', { username, age, tel, file, title:"Add picture" });
});

// Fill in about info
app.post('/new-about', (req, res) => {
  const { username, age, tel, file, about } = req.body;
  res.render('make-about.ejs', { username, age, tel, file, about, title:"Add bio" });
});

// Select the band/artist page
app.post('/select-artists', async (req, res) => {
  const { username, age, tel, file, about } = req.body;

  const userData = {
    username: username,
    age: age,
    tel: tel,
    file: file,
    about: about,
  };

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.insertOne(userData);

    console.log('User data successfully saved in MongoDB');

    res.render('select-artists.ejs', { items: artists, username, age, tel, file, about, title:"Select artists" });
  } catch (error) {
    console.error('An error occurred while saving the data:', error);
    res.render('error-page.ejs');
  } finally {
    await client.close();
  }
});


// User profile
app.get('/profile', async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const userData = await collection.findOne({});

    if (userData) {
      const profileData = {
        username: userData.username,
        age: userData.age,
        file: userData.file,
        about: userData.about
      };

      res.render('profile', { profileData: profileData, title:"My profile" });
    } else {
      res.render('profile', { profileData: null, title:"My profile" });
    }
  } catch (error) {
    console.error('An error occurred while saving the data:', error);
    res.render('error-page.ejs');
  } finally {
    await client.close();
  }
});

// 404 error if page is not found
app.use((req, res, next) => {
  res.status(404).render('error.ejs', {title:"not found"});
});
