import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import mongoose, { Types } from 'mongoose';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Name không được để trống !' })
    name: string;

    @IsNotEmpty({ message: 'Phone không được để trống !' })
    phone: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsMongoId()
    role: mongoose.Schema.Types.ObjectId;

    @IsOptional()
    @IsNotEmpty()
    @IsMongoId({ each: true })
    @IsArray()
    @Type(() => Types.ObjectId) // Chuyển đổi kiểu của mỗi phần tử thành ObjectId
    apartments?: mongoose.Schema.Types.ObjectId[]
}


export class ChangePasswordDto {
    @IsString()
    @MinLength(6, { message: 'Mật khẩu cũ phải có ít nhất 6 ký tự,  ' }) // Độ dài tối thiểu của mật khẩu là 6 ký tự
    oldPassword: string;

    @IsString()
    @MinLength(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' }) // Độ dài tối thiểu của mật khẩu mới là 6 ký tự
    newPassword: string;
}

export class RegisterUserDto {
    @IsNotEmpty({
        message: 'Name không được để trống !',
    })
    name: string;

    @IsNotEmpty({
        message: 'Phone không được để trống !',
    })
    phone: string;

    @IsNotEmpty()
    password: string;
}
