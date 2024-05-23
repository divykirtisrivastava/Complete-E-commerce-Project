const express = require('express')
const db = require('./dataBaseConfig');
const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser')
const app = express()
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cartRoutes = require('./routes/cartRoutes');
const clientRoutes = require('./routes/clientRoutes');
app.use(express.json())
app.use(express.static('uploads'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))

db.connect((err) => {
    if (err) throw err 
    else {
        console.log('database connected')
    }
})


const createTableQuery = `
  CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productType VARCHAR(255) NOT NULL,
    productBrand VARCHAR(255) NOT NULL,
    productPrice VARCHAR(255) NOT NULL,
    productRating VARCHAR(255) NOT NULL,
    productImage VARCHAR(255) NOT NULL
  )
`;

db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table created successfully:');
  });
const createCartTable = `
  CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productType VARCHAR(255) NOT NULL,
    productBrand VARCHAR(255) NOT NULL,
    productPrice VARCHAR(255) NOT NULL,
    productRating VARCHAR(255) NOT NULL,
    productImage VARCHAR(255) NOT NULL
  )
`;

db.query(createCartTable, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table created successfully:');
  });
const clientTable = `
  CREATE TABLE IF NOT EXISTS clientDetail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    userImage VARCHAR(255) NOT NULL
  )
`;

db.query(clientTable, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table created successfully:');
  });


// product routes
app.use('/api', productRoutes);

// admin routes
app.use('/api', adminRoutes);

// cart routes
app.use('/api', cartRoutes);

// client routes
app.use('/api', clientRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})
