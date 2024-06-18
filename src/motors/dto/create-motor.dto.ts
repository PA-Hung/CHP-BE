import { IsNotEmpty } from "class-validator"

export class CreateMotorDto {
    @IsNotEmpty()
    license: string
    @IsNotEmpty()
    brand: string
    @IsNotEmpty()
    availability_status: boolean

    rental_status: boolean
    @IsNotEmpty()
    priceD: Number
    @IsNotEmpty()
    priceH: Number

    note: string
}
