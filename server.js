const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path'); // Import the path module

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // Serve static files

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'new_password',
    database: 'contact_form'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to database');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    const sql = 'INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) throw err;
        res.send('Thank you for your message!');
    });
});

// Serve the contact form HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
