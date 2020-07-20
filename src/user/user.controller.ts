import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UserController {
    constructor(
        private auth: AuthService,
    ) {}

    @Get(':username')
    async getUserByUsername(@Param() params) {
        console.log(params.username);
        const user = await this.auth.validateUser(params.username)
    }
}
