const express = require('express');
const mariadb = require('mariadb');

const app = express();

const PORT = 3000;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Gohabsgo1',
    database : 'contact'
});

//connect to db
async function connect() {
    try{
        const conn = await pool.getConnection();
        console.log('Connected to database');
        return conn;
    } catch (err){
        console.log('Error connecting to database: ' + err);
    }
};

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});