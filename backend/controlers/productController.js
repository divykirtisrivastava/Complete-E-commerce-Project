const db = require('../dataBaseConfig');
const path = require('path')


exports.getAllProducts = (req, res) =>{
    let sql = 'select * from product'
    db.query(sql, (err, result) => {
        if (err) throw err
        else {
            res.json(result)
        }
    })
}

exports.getProductById =  (req, res) => {
    let id = req.params.id
    let sql = "select * from product where id = ?"

    db.query(sql, [id], (err, result) => {
        if (err) throw err
        else {
            res.json(result)
        }
    })
}

exports.updateProduct = (req, res) => {
    let id = req.params.id
    const { productBrand,productType, productPrice, productRating } = req.body;
    let productImage = req.file.filename;
console.log(productImage)
    // if (req.file) {
    //     productImage = req.file.filename;
    //     console.log(productImage)
    // } else {
    //     productImage = req.body.productImage; 
    //     console.log(productImage)
    // }

    let sql = "update product set productBrand=?, productType=?,productPrice=?,productRating=?,productImage=?  where id = ?"
    db.query(sql, [ productBrand,productType, productPrice, productRating ,productImage, id], (err, result) => {
        if (err) throw err
        else {
            res.send("update")
        }
    })
}

exports.uploadFile = (req, res) => {
    const { productBrand,productType, productPrice, productRating } = req.body;
    const productImage = req.file.filename;
    console.log(productImage)
    const query = 'INSERT INTO product ( productBrand,productType, productPrice, productRating, productImage) VALUES ?';
    const values = [[ productBrand,productType, productPrice, productRating, productImage]];
    db.query(query, [values], (err, result) => {
      if (err) throw err
      res.send('Data inserted successfully');
    });
  };
  
exports.productSearch = (req, res) => {
    let data = req.params.value
    let sql = "select * from product where productBrand like ? "
    db.query(sql, ['%' + data + '%'], (err, result) => {
        if (err) throw err
        else {
            res.json(result)
        }
    })
}

exports.productDelete =  (req, res) => {
    let id = req.params.id
    let sql = "delete from product where id = ?"
    db.query(sql, [id], (err, result) => {
        if (err) throw err
        else {
            res.send("deleted")
        }

    })
}