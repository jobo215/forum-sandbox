const crypto = require('crypto');

const User = require('../models/user');

class PublicController{

    indexGet(req, res, next){
        res.render('index', {'path': 'index'});
    }

    loginGet(req, res, next){
        var error = req.body.error;
        if(error != undefined){
            res.render('login', {'error' : error, 'path': 'login'});
        } else{
            res.render('login', {'path' : 'login'});
        }
    }

    loginPost(req, res, next){
        var username = req.body.username;
        var password = req.body.password;
        password = crypto.createHash('md5').update(password).digest('hex');
        User.find({username : username, password : password}, '_id', (err, user) => {
            if(err){
                console.log('Error');
            } else if(user.length > 0){
                req.session.userID = username;
                res.redirect('/user/add-thread');
            } else {
                res.render('login', {'path' : 'login', 'error' : 'no user'});
            }
        })
    }

    registerGet(req, res, next) {
        res.render('register', {'path': 'register'});
    }

    registerPost(req, res, next) {
        var name = req.body.name;
        var surname = req.body.surname;
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var re = req.body.re;
        if(name === '' || surname === '' || email === '' || password === '' || re === '' || username === ''){
            res.render('register', {'error' : 1});
        } else if(re != password){
            res.render('register', {'error' : 2});
        } else {
            User.find({email : email, username : username}, '_id', (err, user) => {
                if(err){
                    console.log('Error');
                } else if(user.length > 0){
                    res.render('register', {'path' : 'register', 'error' : 3});
                } else{
                    password = crypto.createHash('md5').update(password).digest('hex');
                    const user = new User({firstName : name, lastName : surname, username : username, email : email, password : password});
                    user.save().then(() => {
                        res.render('login', {'path' : 'login', 'register': true});
                    });
                }
            })
        }
    }

    get404(req, res, next){
        res.status('404');
        res.render('404');
    }

}

const publicController = new PublicController();

module.exports = publicController;