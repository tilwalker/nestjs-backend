import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '@entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
