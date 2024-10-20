import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(phone: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(phone, password);
        if (!user) {
            throw new UnauthorizedException("Sai thông tin đăng nhập !");
        } return user; //req.user
    }
}