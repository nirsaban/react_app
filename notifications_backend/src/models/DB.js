const mysql = require('mysql');
let db = mysql.createConnection({
    host     : 'naordb.cuu1hxd5gncc.eu-west-1.rds.amazonaws.com',
    user     : 'naordb',
    password : '12345678',
    database:"notifications",
    port:3306
});

db.connect((err) => {
    if (err) {
        console.log(err)
        throw err
    }else{
        console.log("DB connected")
    }
});


module.exports = db;