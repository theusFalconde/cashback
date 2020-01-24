import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtConstante } from '../constant/jwt.constant';
import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstante.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const usuario = await this.authService.validateUserByJwt(payload);
    if (!usuario) {
      throw new UnauthorizedException('Usuário ou senha incorreto.');
    }
    return usuario;
  }
}
