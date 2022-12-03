import { DataType } from 'sequelize-typescript';
import { sequelize } from 'src/db/database';

const User = sequelize.define('user', {
    vid: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataType.STRING,
        allowNull: false
    },
    password: {
        type: DataType.STRING,
        allowNull: false
    },
    facility: {
        type: DataType.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

User.sync().catch((err) => console.error(err));

export { User };