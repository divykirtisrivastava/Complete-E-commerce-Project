const db = require('../dataBaseConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.saveClient =async (req, res) => {
    const { username,email, password } = req.body;
    let hash = await bcrypt.hash(password, 10)
    const userImage = req.file.filename;
    const query = 'INSERT INTO clientdetail ( username,email, password, userImage) VALUES (?,?,?,?)';
    const values = [ username,email, hash, userImage];
    db.query(query, values, (err, result) => {
      if (err) throw err
      res.send('Data inserted successfully');
    });
  };

exports.clientLogin = (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let sql = 'SELECT * FROM clientdetail WHERE username = ?'
    db.query(sql, [username], (err, results) => {
        if(err) throw err
       if(results.length > 0){
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) throw err
            const token = jwt.sign({ id: results[0].id }, 'secretkey', { expiresIn: '30s' });
            res.json({ token , isMatch});
        });
    }
    });
}

exports.createUserCart = (req, res)=>{
    let username = req.params.username
    console.log(username)
    let sql = `CREATE TABLE IF NOT EXISTS ${username} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        productType VARCHAR(255) NOT NULL,
        productBrand VARCHAR(255) NOT NULL,
        productPrice VARCHAR(255) NOT NULL,
        productRating VARCHAR(255) NOT NULL,
        productImage VARCHAR(255) NOT NULL
      )  
    `
    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.send(true)
        }
    })
}
