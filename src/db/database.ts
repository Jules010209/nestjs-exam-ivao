import { Sequelize } from 'sequelize-typescript';
import { db } from '../../config.json';

const sequelize = new Sequelize({
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    host: db.host,
    port: parseInt(db.port),
    username: db.user,
    password: db.password,
    database: db.database,
});

export { sequelize };