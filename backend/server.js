var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

app.use(cors());

var fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const hostname = '127.0.0.1';
const port = 8080;

app.post('/api/auth/login', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       let users = JSON.parse( data );
       let flag = false;
       for(let user of users){
            if(user.username == req.body.username && user.password == req.body.password){
                res.write("SUCCESS");
                flag = true;
                break;
            }
       }
       if(flag == false)
        res.write("FAILURE");
       res.end();
    });
 })

app.get('/api/products', function(req, res){
    fs.readFile( __dirname + "/" + "products.json", 'utf8', function (err, data) {
        let products = JSON.parse( data );
        res.write(data);
        res.end();
     });
})



var server = app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})