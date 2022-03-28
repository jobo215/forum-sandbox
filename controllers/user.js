const Thread = require('../models/thread');

class UserController{

    getAddThread(req, res, next){
        res.render('addThread');
    }
    
    postAddThread(req, res, next){
        let userID = req.session.userID;
        let title = req.body.title;
        let text = req.body.text;
        let language = req.body.language;
        let thread = new Thread({title : title, text : text, language : language, user : userID});
        console.log(thread);
        thread.save().then(() => {
            res.render('addThread');
        });
    }

}

const userController = new UserController();
module.exports = userController;