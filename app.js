const express = require('express');
const mariadb = require('mariadb');
const methodOverride = require('method-override');


const app = express();

const PORT = 3000;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// https://expressjs.com/en/resources/middleware/method-override.html
app.use(methodOverride('_method'));

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Gohabsgo1',
    database: 'assignments'
});

//connect to db
async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to database');
        return conn;
    } catch (err) {
        console.log('Error connecting to database: ' + err);
    }
};

//render home page
app.get('/', (req, res) => {
    res.render('home');
});

app.post('/submit', async (req, res) => {

    const conn = await connect();
    //console.log('connected to db')
    const data = req.body;

    //insert data into db
    conn.query(`INSERT INTO assignments (assignment, description, class, priority,
                date) 
                VALUES ('${data.assignment}','${data.description}', 
                '${data.class}', '${data.priority}', '${data.date}')`);

    //const assignment_num = data.insertId;


    res.render('confirmation', { data: data })
});

app.get('/submit', async (req, res) => {
    res.render('confirmation', { data: [] });
});

app.get('/tasks', async (req, res) => {
    try {
        const conn = await connect();
        const data = await conn.query('SELECT * FROM assignments');
        res.render('tasks', { data: data });
        await conn.end();
    }
    catch (err) {
        console.log("Error: " + err)
    }
});

// route parameters for dynamic path
app.delete('/tasks/:assignment_num', async (req, res) => {
    const conn = await connect();
    const assignment_num = req.body.assignment_num;

    await conn.query(`DELETE FROM assignments WHERE assignment_num = ${assignment_num}`);
    res.redirect('/tasks');
});


app.post('/tasks/assignmentcompleted', async (req, res) => {
    //Debugging
    //console.log('Request body:', req.body); 
    const assignment_num = req.body.assignment_num;
    //console.log('Assignment number:', assignment_num);
    const conn = await connect();
    await conn.query(`UPDATE assignments SET completed = true WHERE assignment_num = ${assignment_num}`)

    res.redirect('/tasks');
})

// Show completed assignments when showing this page
app.get('/completedassignments', async (req, res) => {
    try {
        const conn = await connect()
        const data = await conn.query(`SELECT * FROM assignments WHERE completed = 1`);
        res.render('completed', { data: data });
    }
    catch (err) {
        console.log("Error: " + err)
    }
});

// Re-render tasks with the appropriate Priority
app.post('/tasks/assignmentpriority', async (req, res) => {
    const conn = await connect();
    const priority = req.body.priority
    // console.log(priority)
    const data = await conn.query(`SELECT * FROM assignments WHERE priority = "${priority}"`)

    res.render('tasks', { data });
});

app.post('/tasks/pastdue', async (req, res) => {


    res.render('tasks', { data })

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// Attempting to update assignment and put back into db
// app.put('/tasks/:assignment_num', async (req, res) => {
//     const conn = await connect();
//     //const { assignment, description, class: className, priority, date } = req.body;
//     const assignment_num = req.body.assignment_num;

//     await conn.query(
//         `UPDATE assignments
//         SET assignment = '${data.assignment}',
//             description = '${data.description}',
//             class = '${data.class}',
//             priority = '${data.priority}',
//             date = '${data.date}'
//         WHERE assignment_num = '${assignment_num}'`
//    );
//    res.redirect('/adminpage');

// });