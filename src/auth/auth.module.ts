import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '259200s' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
