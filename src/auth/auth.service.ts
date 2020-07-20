import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    // private jwtService: JwtService
  ) { }

  async validateUser(username: string): Promise<User> {
    // return await this.usersRepository.find({ username: username })
    return null;
  };

  // async returnJWT(user: any) {
  //   const payload = { username: user.username, email: user.email, mobile: user.mobile, firstName: user.firstName, lastName: user.lastName };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
