const db = require('../dataBaseConfig');

exports.getCart = (req, res) => {
    let username = req.params.username
    let sql = `select * from ${username}`
    db.query(sql, (err, result) => {
        if (err) throw err
        else {
            res.json(result)
        }
    })
}

exports.saveCart = (req, res) => {
    let username = req.params.username
    let productBrand = req.body.productBrand
    let productType = req.body.productType
    let productRating = req.body.productRating
    let productPrice = req.body.productPrice
    let productImage = req.body.productImage
    let value = [[productBrand,productType,productRating,productPrice,productImage]]
    let sql = `insert into ${username}(productBrand,productType,productRating,productPrice,productImage) values ?`
    db.query(sql, [value], (err, result) => {
        if (err) throw err
        else {
            res.send("submit")
        }
    })
}

exports.deleteCart = (req, res) => {
    let username = req.params.username
    let id = req.params.id
    let sql = `delete from ${username} where id = ?`
    db.query(sql, [id], (err, result) => {
        if (err) throw err
        else {
            res.send("deleted")
        }

    })
}
