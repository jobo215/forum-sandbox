const Thread = require('../models/thread');

class ThreadRestController{

    getThreadByLanguageName(req, res, next){
        let threads = []
        let language = req.params.language;
        Thread.find({language : language}, (err, doc) => {
            for(let value of doc){
                threads.push(value);
            }
            res.json(threads);
        }).limit(8);
    }

    getLatestThreads(req, res, next){
        let threads = [];
        Thread.find((err, doc) => {
            for(let value of doc){
                threads.push(value);
            }
            res.json(threads);
        })
        .sort({_id : -1})
        .limit(8);
    }

}

module.exports = new ThreadRestController();