const express = require('express');
const app = express();

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

// spajanje statickih fajlova
// kad spojis ne moras da gadjas putanju za css
/* nego koristis /main-css/main.css */
app.use('/main-css', express.static(__dirname + '/public'));
app.use('/bootstrap/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/bootstrap/icons', express.static(__dirname + '/node_modules/bootstrap-icons/font'));


// spajanje glavne putanje sa putanjama za admina
const admin = require('./routes/admin');
app.use('/admin', admin);

// odvajanje implementacija logike u zaseban fajl radi preglednosti
const publicController = require('./controllers/public');

// pozivanje metoda u kojima je implementirana logika
app.get('/', publicController.indexGet);

app.get('/login', publicController.loginGet);

app.post('/login', publicController.loginPost);

app.get('/register', publicController.registerGet);

app.post('/register', publicController.registerPost);


// postavljanje porta
app.listen(3000);