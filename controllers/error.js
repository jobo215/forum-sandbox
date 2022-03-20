class Error{

    get404(err, req, res, next){
        res.render('404');
    }

}

const error = new Error();

module.exports = error;