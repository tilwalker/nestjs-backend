import { IsString, IsNotEmpty, IsEmail, IsMobilePhone } from 'class-validator';

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString() @IsNotEmpty()
    username: string;

    @IsString() @IsNotEmpty()
    password: string;

    @IsEmail() @IsNotEmpty()
    email: string;

    @IsMobilePhone() @IsNotEmpty()
    mobile: string;
}