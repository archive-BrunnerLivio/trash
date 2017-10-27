// External dependencies
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const http = require('http').createServer(app);
const chalk = require('chalk');
const bodyParser = require('body-parser');
const otp = require('otp');

// Local dependencies
const APP_CONFIG = require('./app.config');

// Local Constants
const PORT = process.env.PORT || APP_CONFIG.SERVER.PORT;
const HOST = process.env.HOST || APP_CONFIG.SERVER.HOST;
const VIEWS_DIR = path.join(__dirname, '/views');
const STATIC_DIR = path.join(__dirname, '/static');
const NODE_MODULES_DIR = path.join(__dirname, '../node_modules');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(VIEWS_DIR, '/layouts'),
    partialsDir: path.join(VIEWS_DIR, '/partials')
});

// -- MAIN --
app.set('views', VIEWS_DIR);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Vendor scripts
app.use('/static', express.static(STATIC_DIR));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/SSOTokenSignIn', (req, res) => {

});

http.listen(PORT, HOST, () => {
    console.log(`Up and running on ` + chalk.blue(`http://${HOST}:${PORT}`));
});