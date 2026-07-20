const { Sequelize } = require('sequelize');
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database.sqlite');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: false,
});

sequelize.authenticate()
    .then(() => {
        console.log(`SQLite connection established successfully at ${dbPath}`);
    })
    .catch((error) => {
        console.error('Unable to connect to the SQLite database:', error.message);
    });

module.exports = sequelize;
