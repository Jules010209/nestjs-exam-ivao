import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { compare } from 'bcryptjs';

@Injectable()
export class ConnexionService {
    constructor(private readonly sequelize: Sequelize) {}

    async registerCallback(body:any, res:any, req:any) {
        let email = body.user_email_address;
        let password = body.user_password;
        let facility = body.facility;

        let salt = await genSalt(10);
        let Hash = await hash(password, salt);

        let getSql = await this.sequelize.query(`SELECT * FROM user_list WHERE email = "${email}"`, { type: QueryTypes.SELECT, raw: true });

        if(getSql.length > 0) return res.status(400).send('Error ! This email is already use !');

        await this.sequelize.query(`INSERT INTO user_list (email, password, facility) VALUES ("${email}", "${Hash}", "${facility}")`, { type: QueryTypes.INSERT });

        try {
            let getSql2 = await this.sequelize.query(`SELECT * FROM user_list WHERE email = "${email}"`, { type: QueryTypes.SELECT, raw: true });

            for(var e = 0; e < getSql2.length; e++) {
                req.session.user_id = getSql2[e]['vid'];
            }
    
            return res.redirect('/');
        } catch(err) {
            return res.status(400).send(err);
        }
    }

    async loginCallback(body:any, res:any, req:any) {
        let email = body.user_email_address;
        let password = body.user_password;

        let getSql = await this.sequelize.query(`SELECT * FROM user_list WHERE email = "${email}"`, { type: QueryTypes.SELECT, raw: true });

        if(getSql.length < 1) return res.status(400).send('Incorrect email !');
        
        for(var e = 0; e < getSql.length; e++) {
            let cPassword = await compare(password, getSql[e]['password']);

            if(!cPassword) return res.status(400).send('Incorrect password !');
            
            req.session.user_id = getSql[e]['vid'];

            return res.redirect('/');
        }
    }

    async logout(res:any, session:Record<string, any>) {
        return session.destroy(() => {
            res.redirect('/');
        });
    }
}