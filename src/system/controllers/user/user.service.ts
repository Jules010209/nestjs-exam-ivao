import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/models/User';
import { Booking } from 'src/models/Booking';
import { Response } from 'express';

@Injectable()
export class UserService {
    async getProfile(session: Record<string, any>) {
        let query_a = await User.findOne({ where: { vid: session.user_id }, raw: true });

        let db_a = {
            vid: query_a['vid'],
            email: query_a['email'],
            password: query_a['password']
        };

        let query_b = await Booking.findOne({ where: { user: session.user_id }, raw: true });
        let b_count = await Booking.findAndCountAll({ where: { user: session.user_id } });

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

        if(b_count.count > 0) {
            db_b.id = query_b['id'];
            db_b.user =  query_b['user'];
            db_b.start_time = query_b['start_hour'];
            db_b.end_time = query_b['end_hour'];
            db_b.date = query_b['day'];
            db_b.position = query_b['position'];
            db_b.voice = query_b['voice'];
            db_b.training = query_b['training'];
            db_b.event = query_b['event'];
        }

        return { session: session, db_a: db_a, db_b: db_b };
    }

    async postEditProfile(body: any, res: Response, session: Record<string, any>) {
        let start_time = body.start_hour;
        let end_time = body.end_hour;
        let date = body.day;
        let position = body.position;
        let voice = body.voice;
        let training = body.training;
        let event = body.event;

        if(start_time !== end_time || end_time !== start_time) {
            let Is = await Booking.findAndCountAll({ where: { user: session.user_id }});

            if(Is.count > 0) {
                try {
                    await Booking.update({
                        start_hour: start_time,
                        end_hour: end_time,
                        day: date,
                        position: position,
                        voice: parseInt(voice) ? parseInt(voice) : 0,
                        training: parseInt(training) ? parseInt(training) : 0,
                        event: parseInt(event) ? parseInt(event) : 0,
                    }, { where: { user: session.user_id } }).then(() => {
                        return res.redirect('/user/profile');
                    }).catch((err) => {
                        throw new InternalServerErrorException(err);
                    });
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

    async deleteBook(res: Response, session: Record<string, any>) {
        Booking.destroy({ where: { user: session.user_id } }).then(() => {
            return res.redirect('/');
        }).catch((err) => {
            throw new InternalServerErrorException(err);
        });
    }
}