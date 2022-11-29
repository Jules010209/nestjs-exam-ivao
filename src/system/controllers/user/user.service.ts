import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
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
            id: null,
            user: null,
            start_time: null,
            end_time: null,
            date: null,
            position: null,
            voice: null,
            training: null,
            event: null
        }

        if(query_b.length > 0) {
            db_b.id = query_b[0]['id'];
            db_b.user =  query_b[0]['user'];
            db_b.start_time = query_b[0]['start_hour'];
            db_b.end_time = query_b[0]['end_hour'];
            db_b.date = query_b[0]['day'];
            db_b.position = query_b[0]['position'];
            db_b.voice = query_b[0]['voice'];
            db_b.training = query_b[0]['training'];
            db_b.event = query_b[0]['event'];
        }

        return { session: session, db_a: db_a, db_b: db_b };
    }

    async postEditProfile(body:any, res:any, session:any) {
        let start_time = body.start_hour;
        let end_time = body.end_hour;
        let date = body.day;
        let position = body.position;
        let voice = body.voice;
        let training = body.training;
        let event = body.event;

        if(start_time !== end_time || end_time !== start_time) {
            let Is = await this.sequelize.query(`SELECT * FROM booking_list WHERE user = "${session.user_id}"`, { type: QueryTypes.SELECT, raw: true });

            if(Is.length > 0) {
                try {
                    let sql = `UPDATE booking_list SET start_hour = '${start_time}', end_hour = '${end_time}', day = '${date}', position = '${position}', voice = ${parseInt(voice) ? parseInt(voice) : 0}, training = ${parseInt(training) ? parseInt(training) : 0}, event = ${parseInt(event) ? parseInt(event) : 0} WHERE user = '${session.user_id}'`;
    
                    await this.sequelize.query(sql, { type: QueryTypes.UPDATE });
    
                    return res.redirect('/user/profile');
                } catch(err) {
                    throw new InternalServerErrorException(err);
                }
            } else {
                throw new UnauthorizedException('Before edit an book, you must do book an position !');
            }
        } else {
            throw new BadRequestException('Error, verify your time !');
        }
    }

    async deleteBook(res:any, session:any) {
        let sql = `DELETE FROM booking_list WHERE user = '${session.user_id}'`;

        await this.sequelize.query(sql, { type: QueryTypes.DELETE });

        return res.redirect('/');
    }
}