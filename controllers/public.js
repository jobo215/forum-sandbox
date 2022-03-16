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
        console.log(req.body.email);
    }

    registerGet(req, res, next) {
        res.render('register', {'path': 'register'});
    }

    registerPost(req, res, next) {
        var name = req.body.name;
        var surname = req.body.surname;
        var email = req.body.email;
        var password = req.body.password;
        var re = req.body.re;
        if(name === '' || surname === '' || email === '' || password === '' || re === ''){
            res.render('register', {'error' : 1});
        } else if(re != password){
            res.render('register', {'error' : 2});
        } else {
            res.render('login', {'register': true});
        }
    }

}

const publicController = new PublicController();

module.exports = publicController;