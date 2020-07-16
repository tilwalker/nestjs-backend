/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
      private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        // const user = await this.usersService.findOne(username);
        // if (user && user.password === pass) {
        //   const { password, ...result } = user;
        //   return result;
        // }
        return null;
    };

    async returnJWT(user: any) {
        const payload = { username: user.username, email: user.email, mobile: user.mobile, firstName: user.firstName, lastName: user.lastName };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
