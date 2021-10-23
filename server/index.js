const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const User = require('./models/user')


const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({extended: true}));

//connect to mongoDB
const dbURI = 'mongodb+srv://magda:bBoo91tDt-1@users.2n2n4.mongodb.net/signup-login?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true})
    .then((result) => {app.listen(PORT, () => {console.log(`Server listening on ${PORT}`);});})
    .catch((err) => {console.log(err);})


//Test connection
app.get("/api", (req, res) => {
    const user = new User({
        name: "John",
        email: "jong@gmail.com",
        password: "psw123"
    });

    user.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

