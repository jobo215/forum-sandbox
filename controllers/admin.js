class AdminController{

    indexGet(req, res, next){
        res.render('adminIndex');
    }

}

const adminController = new AdminController();

module.exports = adminController;