const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
var http = require('http');


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://rishu7691123:rishu7691@cluster2.qfmyo5p.mongodb.net/test');
}

// define mongoose schemaa
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

// The next step is compiling our schema into a Model
const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug

app.set('view engine', 'html') // Set the template engine as html
app.engine('html', require('ejs').renderFile)

app.set('views', path.join(__dirname, 'views')) // Set the views directory


// ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
})
app.get('/about', (req, res) => {
    res.status(200).render('about.html');
})
app.get('/services', (req, res) => {
    res.status(200).render('services.html');
})
app.get('/classinfo', (req, res) => {
    res.status(200).render('classinfo.html');
})


// for get request 
app.get('/contact', (req, res) => {
    res.status(200).render('contact.html');
})

//for post request
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send('<script>alert("This item is saved successfully on database. :)") </script>')
    }).catch (() => {
    res.status(404).send('<script>alert("Item not saved on database. :(")</script>')
});
    // res.status(200).render('contact.pug');
})





// START THE SERVER
app.listen(process.env.PORT||8000, () => {
    console.log(`The application started successfully on port`);
});



// if you want to add data in database with mongodb compass
// [
//     { "_id" : 8752, "title" : "Divine Comedy", "author" : "Dante", "copies" : 1 },
//     { "_id" : 7000, "title" : "The Odyssey", "author" : "Homer", "copies" : 10 },
//     { "_id" : 7020, "title" : "Iliad", "author" : "Homer", "copies" : 10 },
//     { "_id" : 8645, "title" : "Eclogues", "author" : "Dante", "copies" : 2 },
//     { "_id" : 8751, "title" : "The Banquet", "author" : "Dante", "copies" : 2 }
//   ]