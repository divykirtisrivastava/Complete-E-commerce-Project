const db = require('../dataBaseConfig');

exports.saveClient = (req, res) => {
    const { username,email, password } = req.body;
    const userImage = req.file.filename;
    const query = 'INSERT INTO clientdetail ( username,email, password, userImage) VALUES (?,?,?,?)';
    const values = [ username,email, password, userImage];
    db.query(query, values, (err, result) => {
      if (err) throw err
      res.send('Data inserted successfully');
    });
  };

exports.clientLogin = (req, res) => {
    let username = req.body.username
    let password = req.body.password

    let sql = "select * from clientdetail where username = ? and password = ?"
    db.query(sql, [username, password], (err, result) => {
        if (err) throw err
        else {
            if (result.length > 0) {
                res.send(true)
            }
            else {
                res.send(false)
            }
        }
    })
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
