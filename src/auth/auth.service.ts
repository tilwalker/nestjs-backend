import { Injectable, HttpException, Inject, forwardRef, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@entities';
import { IUser } from '@interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

const saltRound = 10;
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  validateUser(username: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const user = await this.usersRepository.findOne({username});
      if(user && user.username) resolve(true);
      else resolve(false);
    })
  };

  async returnJWT(user: User) {
    const payload = {
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async hashPassword(password: string) {
    /* Hash password user */
    return new Promise(async (resolve, reject) => {
      await bcrypt.hash(password, saltRound)
      .then(function(hash) {
        // Store hash in your password DB.
        resolve(hash);
      });
    })

  }
}
