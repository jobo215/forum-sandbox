const express = require('express');
const app = express();
const session = require('express-session');

const mongoose = require('mongoose');

// za citanje requestova
const bodyParser = require('body-parser');

// requestovi sa jsonom
app.use(bodyParser.json());
// post requestovi
app.use(bodyParser.urlencoded({ extended: true }));

// mora da bi se procitao ejs
app.set('view engine', 'ejs');

// bez ovoga nece da nadje views
app.set('views', 'views');

app.use(session({secret : 'tajna', resave : false, saveUninitialized: false}));

// spajanje statickih fajlova
// kad spojis ne moras da gadjas putanju za css
/* nego koristis /main-css/main.css */
app.use('/main-css', express.static(__dirname + '/public'));
app.use('/bootstrap/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/bootstrap/icons', express.static(__dirname + '/node_modules/bootstrap-icons/font'));
app.use('/js/vue', express.static(__dirname + '/node_modules/vue/dist'));
app.use('/js/axios', express.static(__dirname + '/node_modules/axios/dist'));
app.use('/main-js', express.static(__dirname + '/public/js'));


// spajanje glavne putanje sa putanjama za admina
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

const publicRoutes = require('./routes/public');
app.use('/', publicRoutes);

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

const threadRest = require('./routes/thread-rest');
app.use('/thread', threadRest);

// const errorController = require('./controllers/error');
// app.use(errorController.get404);

mongoose.connect('mongodb://localhost:27017/forum').then(() => {
    app.listen(3000);
});
// postavljanje porta