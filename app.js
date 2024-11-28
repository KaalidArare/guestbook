// Get the express package 
const express = require('express');

// Instantiate an express (web) app
const app = express();
const mariadb = require('mariadb');

// Configure the database connection
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'guestbook'
});

// Connect to the database
async function connect() {
    try {
        let conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    } catch (err) {
        console.log('Error connecting to the database: ' + err);
    }
}
// Define a port number for the app to listen on
const PORT = 3000;

// Tell the app to encode data into JSON format
app.use(express.urlencoded({ extended: false }));

// Set your view (templating) engine to "EJS"
// (We use a templating engine to create dynamic web pages)
app.set('view engine', 'ejs');
const data = [];
app.get('/', (req, res) => {
    console.log("Hello, world - server");

    //sends the home 
    res.render('home', {data : data});
});
// Define a "default" route, 
// e.g. jshmo.greenriverdev.com/reservation-app/
app.post('/submit', async (req, res) => {
    console.log(req.body)

    // Get the data from the form that was submitted
    // from the body of the request object
    const data = {
        firstName: req.body.fname,
        lastName: req.body.lname,
        company: req.body.company,
        message: req.body.message
    }

    console.log(data);

    // Connect to the database
    const conn = await connect();
    
    // Insert the data into the database
    await conn.query(`INSERT INTO guestbook (firstName, lastName, company, message) VALUES ('${data.firstName}', '${data.lastName}',
        '${data.company}', '${data.message}');`);

    // Display the confirm page, pass the data
    res.render('confirmations', { details: data });
});

app.get('/confirmations', async (req, res) => {
    // Get the data from the database
    const conn = await connect();

    // Query the database
    const rows = await conn.query('SELECT * FROM guestbook;');

    // Display the confirm page, pass the data
    res.render('confirmations', { confirmations: rows });
});

app.get('/admin', async (req, res) => {

    const conn = await connect();
    const rows = await conn.query('SELECT * FROM guestbook ORDER BY time DESC;');
    res.render('admin', { data : rows} );
});

// Tell the app to listen for requests on the designated port
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});
