import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';

@Injectable()
export class UserService {
    constructor(private readonly sequelize: Sequelize) {}

    async getProfile(session:any) {
        let query_a = await this.sequelize.query(`SELECT * FROM user_list WHERE vid = ${session.user_id}`, { type: QueryTypes.SELECT, raw: true });

        let db_a = {
            vid: query_a[0]['vid'],
            email: query_a[0]['email'],
            password: query_a[0]['password']
        };

        let query_b = await this.sequelize.query(`SELECT * FROM booking_list WHERE user = '${session.user_id}'`, { type: QueryTypes.SELECT, raw: true });

        let db_b = {
            id: query_b[0]['id'],
            user: query_b[0]['user'],
            start_time: query_b[0]['start_hour'],
            end_time: query_b[0]['end_hour'],
            date: query_b[0]['day'],
            position: query_b[0]['position'],
            voice: query_b[0]['voice'],
            training: query_b[0]['training'],
            event: query_b[0]['event']
        };

        return { session: session, db_a: db_a, db_b: db_b };
    }

    async postEditProfile(res:any, session:any) {
        
    }
}
