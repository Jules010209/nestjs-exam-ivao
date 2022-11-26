import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';

@Injectable()
export class UserService {
    constructor(private readonly sequelize: Sequelize) {}

    async getProfile(session:any) {
        return this.sequelize.query(``, { type: QueryTypes.SELECT, raw: true });
    }
}
