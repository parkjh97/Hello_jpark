//create path
const path = require('path');
const express = require('express');
//body 에 담긴 정보를 parser
const bodyParser = require('body-parser');
//ejs
const ejs = require('ejs');
const app = express();
const port = 4000;

//bodyParser
app.use(bodyParser.urlencoded({ extended: true}));

//ejs == jsp
app.set('view engine', 'ejs');


//mysql
const mysql      = require('mysql');
//con mysql
const con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'express_db'
});

//select
app.get('/', (req, res) => {
    const sql = "select * from users";
    con.query(sql, function(err, result, fields){
        if (err) throw err;
        res.render('index', {users : result});
    });
});

//app.post('/', (req, res) => res.send(req.body));
app.post('/', (req, res) => {
    const sql = "INSERT INTO users SET ?";
    //res.send(req.body);
    //console.log(req.body);
    con.query(sql,req.body,function(err, result, fields){
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    });
});

//html file
app.get('/create', (req, res) => 
    res.sendFile(path.join(__dirname, 'html/Form.html')));


//updateForm
app.get('/edit/:id', (req, res) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    con.query(sql, [req.params.id], function(err, result, fields){
        if (err) throw err;
        res.render('edit', {user : result});
    });
});

//update
app.post('/update/:id', (req, res) => {
    const sql = "UPDATE users  SET ? WHERE id = " + req.params.id;
    con.query(sql, req.body, function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    });
});
    
//delete
app.get('/delete/:id', (req, res) => {
    const sql = "DELETE FROM users WHERE id = ?";
    con.query(sql, [req.params.id], function(err, result, fields){
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    });
});

//app.js http connetion log
app.listen((port), () => console.log(`ex ${port}!`));




