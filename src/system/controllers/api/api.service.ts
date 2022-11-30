import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Booking } from '../../../models/Booking';

@Injectable()
export class ApiService {
    async findUser(id:any) {
        return await (await Booking.findOne({ where: { id: id } })).toJSON();
    }

    async getCalendar(day:any) {
        return await Booking.findAll({ where: { day: day } });
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
            let Is = await Booking.findAndCountAll({ where: { user: session.user_id }});
            
            if(Is.count < 1) {
                try {
                    Booking.create({
                        user: session.user_id,
                        start_hour: start_time,
                        end_hour: end_time,
                        day: date,
                        position: position,
                        voice: parseInt(voice) ? parseInt(voice) : 0,
                        training: parseInt(training) ? parseInt(training) : 0,
                        event: parseInt(event) ? parseInt(event) : 0,
                    }).then(() => {
                        return res.redirect('/');
                    }).catch((err) => {
                        throw new InternalServerErrorException(err);
                    });
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