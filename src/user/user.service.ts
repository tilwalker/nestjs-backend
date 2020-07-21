/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, Inject, forwardRef, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { User } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';
import { IUser } from '@interfaces';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private auth: AuthService
    ) {

    }

    async getUserByUsername(username: string): Promise<User> {
        const user = await this.usersRepository.findOne({ username: username });
        if(!user) return null;
        delete user.password;
        return user;
    }
    
    async signup(userData: User) {
        try {
            const userIsExist = await this.auth.validateUser(userData.username);
            if (userIsExist) {
                throw new BadRequestException();
            }
            const passwordHash: any = await this.auth.hashPassword(userData.password);
            const payload = {
                ...userData,
            };
            payload.password = passwordHash;
            const user = this.usersRepository.create(payload);
            delete user.password;
            const access_token = this.auth.returnJWT(user);
            const response = {
                ...user,
                access_token
            }
            return response;
        } catch (error) {
            throw new UnauthorizedException();
        }
    };

    async login(username, password) {
        /* get user first */
        const user: any = this.usersRepository.findOne(username);
        if(!user) throw new BadRequestException('message', 'username or password is incorect');
        /** After get user, check password  */
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            console.log('user login done');
            delete user.password;
            const access_token = this.auth.returnJWT(user);
            return {
                ...user,
                access_token
            };
        }
        throw new BadRequestException('message', 'username or password is incorect');
    }

}
