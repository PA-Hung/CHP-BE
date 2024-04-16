import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

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

    @IsNotEmpty()
    @IsMongoId({ each: true })
    @IsArray()
    apartments: mongoose.Schema.Types.ObjectId[]
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
