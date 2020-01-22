import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtPayload } from './interface/jwt-payload.interface';
import { LoginDto } from '../usuario/dto/login.dto';
import { Usuario } from 'src/usuario/interface/usuario.interface';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUserByPassword(login: LoginDto) {
    let usuarioLogando = await this.usuarioService.findByEmail(login.email);
    return new Promise(resolve => {
      usuarioLogando.checkPassword(login.senha, (err, isMatch) => {
        if (err) throw new UnauthorizedException();
        if (isMatch) {
          resolve(this.createJwtPayload(usuarioLogando));
        } else {
          throw new UnauthorizedException();
        }
      });
    });
  }

  async validateUserByJwt(payload: JwtPayload) {
    let usuario = await this.usuarioService.findByEmail(payload.email);
    if (usuario) {
      return this.createJwtPayload(usuario);
    } else {
      throw new UnauthorizedException();
    }
  }

  createJwtPayload(usuario: Usuario) {
    let data: JwtPayload = {
      email: usuario.email,
    };
    let jwt = this.jwtService.sign(data);
    return {
      expiresIn: 3600,
      accessToken: `Bearer ${jwt}`,
      usuario: usuario,
    };
  }
}
