import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcryptjs';
import { User } from 'src/models/User';

@Injectable()
export class ConnexionService {
    async registerCallback(body: any, res: any, session: Record<string, any>) {
        let email = body.user_email_address;
        let password = body.user_password;
        let facility = body.facility;

        let salt = await genSalt(10);
        let Hash = await hash(password, salt);

        let getSql = await User.findAndCountAll({ where: { email: email } });
        if(getSql.count > 0) throw new BadRequestException('Error ! This email is already use !');

        User.create({
            email: email,
            password: Hash,
            facility: facility
        }).then(async () => {
            if(getSql.count < 1) {
                let user = await User.findOne({ where: { email: email }, raw: true });

                session.user_id = user['vid'];

                return res.redirect('/');
            }
        }).catch((err) => {
            throw new InternalServerErrorException(err);
        });
    }

    async loginCallback(body:any, res:any, req:any) {
        let email = body.user_email_address;
        let password = body.user_password;

        let count = await User.findAndCountAll({ where: { email: email }, raw: true });
        let user = await User.findOne({ where: { email: email }, raw: true });
        
        if(count.count < 1) throw new BadRequestException('Incorrect email !');
        
        for(var e = 0; e < count.count; e++) {
            let cPassword = await compare(password, user['password']);

            if(!cPassword) throw new BadRequestException('Incorrect password !');
            
            req.session.user_id = user['vid'];

            return res.redirect('/');
        }
    }

    async logout(res:any, session:Record<string, any>) {
        return session.destroy(() => {
            res.redirect('/');
        });
    }
}