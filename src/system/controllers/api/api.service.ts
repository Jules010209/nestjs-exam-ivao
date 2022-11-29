import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { Booking } from '../../../models/Booking';

@Injectable()
export class ApiService {
    constructor(private readonly sequelize: Sequelize) {}

    async findUser(id:any) {
        return await (await Booking.findOne({ where: { id: id } })).toJSON();
        // return await this.sequelize.query(`SELECT * FROM booking_list WHERE id = ${id}`, { type: QueryTypes.SELECT });
    }

    async getCalendar(day:any) {
        return await this.sequelize.query(`SELECT * FROM booking_list WHERE day = "${day}"`, { type: QueryTypes.SELECT });
    }

    async bookPosition(body:any, res:any, session:any) {
        let start_time = body.start_hour;
        let end_time = body.end_hour;
        let date = body.day;
        let position = body.position;
        let voice = body.voice;
        let training = body.training;
        let event = body.event;

        if(start_time !== end_time || end_time !== start_time) {
            let Is = await this.sequelize.query(`SELECT * FROM booking_list WHERE user = "${session.user_id}"`, { type: QueryTypes.SELECT, raw: true });
            
            if(Is.length < 1) {
                try {
                    let sql = `INSERT INTO booking_list (user, start_hour, end_hour, day, position, voice, training, event) VALUES ('${session.user_id}', '${start_time}', '${end_time}', '${date}', '${position}', ${parseInt(voice) ? parseInt(voice) : 0}, ${parseInt(training) ? parseInt(training) : 0}, ${parseInt(event) ? parseInt(event) : 0})`;
    
                    await this.sequelize.query(sql, { type: QueryTypes.INSERT });
    
                    return res.redirect('/');
                } catch(err) {
                    throw new InternalServerErrorException(err);
                }
            } else {
                throw new UnauthorizedException('You are already book an position !');
            }
        } else {
            throw new BadRequestException('Error, verify your time !');
        }
    }
}