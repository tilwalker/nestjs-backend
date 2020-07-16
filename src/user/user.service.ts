/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';

import bcrypt from 'bcrypt';

const saltRound = 10;

@Injectable()
export class UserService {

    signup(userData: any): Promise<User> {
        /* Hash password user */
        bcrypt.hash(userData.password, saltRound, (err, hash) => {
            if(err) {
                console.log(err, 'err<<<<');
            }
            userData.password = hash;
        })
        return;
    }

    async login(userName, password) {
        /* get user first */
        /** After get user, check password  */
        let user: any;
        const match = await bcrypt.compare(password, user.password);

        if(match) {
            console.log('user login done');
            return {data: user};
        }
        return {
            error: 'username or password is incorrect'
        };
    }
}
