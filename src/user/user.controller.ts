import { Controller, Get, Param, HttpException, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { IUser } from '@interfaces';
import { User } from '@entities';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Get(':username')
    async getUserByUsername(@Param() params) {
        try {
            console.log(params.username);
            const user = await this.userService.getUserByUsername(params.username);
            if (!user) {
                throw new HttpExceptionFilter();
            }
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    @Post('signup')
    async createUser(@Body() userData: User) {
        try {
            const user = await this.userService.signup(userData);
            if(!user) throw new HttpExceptionFilter();
            return user;
        } catch (error) {
            throw new Error(error)
        }
    }

    @Post('login')
    async login(@Body() req: {username, password}) {
        console.log(req);
        try {
            const res = await this.userService.login(req.username, req.password);
            if(!res) throw new HttpExceptionFilter();
            return res;
        } catch (error) {
            throw new Error(error);
        }
    }
}
