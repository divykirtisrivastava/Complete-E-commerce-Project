const db = require('../dataBaseConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

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
    let email = req.body.email
    let password = req.body.password
    let sql = 'SELECT * FROM clientdetail WHERE email = ?'
    db.query(sql, [email], (err, results) => {
        if(err) throw err
       if(results.length > 0){
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) throw err
            const token = generateToken(results[0]);
            res.json({ token , isMatch});
        });
    }
    });
}

exports.profile = (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).send('Access denied');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    
        if (err) {
            return res.status(400).send('Invalid token');
        }
        db.query('SELECT * FROM clientdetail WHERE id = ?', [decoded.id], (err, results) => {
            if (err) {
                return res.status(500).send('Database error');
            }
            res.status(200).json(results[0]);
        });
    });
}

exports.createUserCart = (req, res)=>{
    let username = req.params.username
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

exports.getClientDetails = (req, res) => {
    let id = req.params.id
    let sql = 'SELECT * FROM clientdetail WHERE id = ?'
    db.query(sql, [id], (err, results) => {
        if(err) throw err
      else{
        res.json(results)
      }
    })
    
}