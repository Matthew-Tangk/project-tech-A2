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

exports.addArtists = (req, res) => {
    res.render('addartists.ejs', {title:"Add artists", items: artists});
}