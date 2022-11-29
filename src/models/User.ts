import { Sequelize, DataType } from 'sequelize-typescript';
import { db } from '../../config.json';
const sequelize = new Sequelize();

const User = sequelize.define('user', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user: {
        type: DataType.STRING,
        allowNull: false
    },
    start_hour: {
        type: DataType.TIME,
        allowNull: false
    },
    end_hour: {
        type: DataType.TIME,
        allowNull: false
    },
    day: {
        type: DataType.STRING,
        allowNull: false
    },
    position: {
        type: DataType.STRING,
        allowNull: false
    },
    voice: {
        type: DataType.INTEGER,
        allowNull: false
    },
    training: {
        type: DataType.INTEGER,
        allowNull: false
    },
    event: {
        type: DataType.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

User.sync().catch((err) => console.error(err));

export { User };