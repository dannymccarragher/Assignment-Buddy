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
    database : 'assignments'
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

//render home page
app.get('/', (req, res) => {
    res.render('home');
});

app.post('/submit', async (req, res) => {

    const conn = await connect();
    console.log('connected to db')
    const data = req.body;

    //insert data into db
    conn.query(`INSERT INTO assignments (assignment, description, class, priority,
                date) 
                VALUES ('${data.assignment}','${data.description}', 
                '${data.class}', '${data.priority}', '${data.date}')`);

    res.render('confirmation');
});

app.get('/submit', (req,res) => {
    res.render('submit', {data : data})
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});