require('dotenv').config({ path: "./server/system.env"});
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { stringify } = require('querystring');

const mongoose = require('mongoose');
const User = require('./models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//connect to mongoDB
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@users.2n2n4.mongodb.net/signup-login?retryWrites=true&w=majority`;
mongoose.connect(dbURI, {useNewUrlParser: true})
    .then((result) => {app.listen(PORT, () => {console.log(`Server listening on ${PORT}`);});})
    .catch((err) => {console.log(err);})

//verify jwt token
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token){
        res.json({message: "You need to send access token"})
    } else{
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.json({message: "Invalid or expired access token"})
            } else{
                req.userId = decoded.id;
                next()
            }
        })
    }
}


//Signup form submit
app.post("/signup", (req, res) => {
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password

    bcrypt.hash(password, saltRounds, function(err, hash) {
        if(err){
            console.log(err)
        }else{
            const user = new User({
                name: name,
                email: email,
                password: hash
            });

            user.save()
                .then((result) => {
                    console.log(result)
                    res.json({message: "Success"})
                })
                .catch((err) => {
                    console.log(err)
                    res.json({message: "Failure"})
                })
        }
    });
    
    
})

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    User.find({email: email}, (err, data) => {
        if(err){
            console.log(err);
        }else{
            if(data.length == 0){
                res.json({message: "Account with this email address doesn't exist"})
            }else{
                bcrypt.compare(password, data[0].password, function(err, result) {
                    if(err){
                        console.log(err);
                    } else if(!result){
                        res.json({message: "Incorrect username/password combination"})
                    } else{
                        const id = data[0].id;
                        const token = jwt.sign({id}, process.env.JWT_SECRET, {
                            expiresIn: 300,
                        })
                        res.json({token: token});
                    }
                });
            }
        }
    })
    
})

app.get("/userInfo", verifyJWT, (req, res) => {
    User.find({_id: req.userId}, (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.json({name: data[0].name, email: data[0].email})
        }
    })
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

