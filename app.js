// ==================== EXTERNAL IMPORTS ==================== //

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
// ==================== INTERNAL IMPORTS ==================== //

// ==================== GLOBAL VARIABLES ==================== //

const app = express();

let globalUsers = [];
// ==================== MIDDLEWARE ==================== //
app.set('view engine', 'ejs');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// serving static files
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
// ==================== FUNCTIONS ==================== //

// returns the full path of the passed view
const getViewPath = view => path.join(__dirname, `views/${view}/${view}.ejs`);

// ==================== ROUTES ==================== //

// ==================== RENDER VIEWS ==================== //

app.get('/', (req, res) => {
    request('https://randomuser.me/api/?results=25',(err, response, body) => {
        if (err){
            res.send(err);
            return
        }
        globalUsers = JSON.parse(body).results;
        res.render(getViewPath('home'), {users: globalUsers});
    });
});

app.get('/detail/:username', (req, res) => {
    res.render(getViewPath('detail'), {user: globalUsers.filter(user => user.login.username === req.params.username)[0]});
});

// ==================== START SERVER ==================== //

app.listen(process.env.PORT || 3000, () => {
    console.log('READY');
});

// ====================================================== //
