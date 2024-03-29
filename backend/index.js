let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./database/db');

//Express Route
const workRoute = require('../backend/routes/work.route');

//Conneting MongoDB database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database successfully connection');
},
    error => {
    console.log('Could not connection to database: ' + error);   
    }
)
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/works', workRoute);

//PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port);
})
app.use(express.json());
// 404 Error
app.use((req, res, next) => {
    next(createError(404))
})

// Error handler
app.use(function(err, req, res, next) {
    console.log(err.message);
    if (!err.statusCode) err.statusCode= 500;
    res.status(err.statusCode).send(err.message);
})