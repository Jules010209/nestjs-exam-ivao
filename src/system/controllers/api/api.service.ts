import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';

@Injectable()
export class ApiService {
    constructor(private readonly sequelize: Sequelize) {}

    async findUser(id:any) {
        return await this.sequelize.query(`SELECT * FROM booking_list WHERE id = ${id}`, { type: QueryTypes.SELECT });
    }

    async getCalendar(day:any) {
        return await this.sequelize.query(`SELECT * FROM booking_list WHERE day = "${day}"`, { type: QueryTypes.SELECT });
    }
}