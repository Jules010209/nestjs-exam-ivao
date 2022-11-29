import { DataType } from 'sequelize-typescript';
import { sequelize } from 'src/dto/database.dto';

const Booking = sequelize.define('booking', {
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
    timestamps: false,
});

Booking.sync().catch((err) => console.error(err));

export { Booking };