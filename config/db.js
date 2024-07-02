const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }

  console.log('Connected to the database.');

  // Check if the database exists
  connection.query(`SHOW DATABASES LIKE 'ecommerce_db'`, (err, results) => {
    if (err) {
      console.error('Error checking for database:', err.stack);
      return;
    }

    if (results.length === 0) {
      // Database does not exist, create it
      connection.query(`CREATE DATABASE ecommerce_db`, (err, results) => {
        if (err) {
          console.error('Error creating database:', err.stack);
          return;
        }
        console.log('Database ecommerce_db created.');
      });
    } else {
      console.log('Database ecommerce_db already exists.');
    }
  });
});


const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected...');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

const syncDB = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synced...');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
};

module.exports = { sequelize, connectDB, syncDB };
