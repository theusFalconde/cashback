import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../usuario/interface/usuario.interface';
import { LoginDto } from '../usuario/dto/login.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUserByPassword(login: LoginDto) {
    let usuarioLogando = await this.usuarioService.findByEmail(login.email);
    if(!usuarioLogando) {
      throw new BadRequestException('Usuário não encontrado ou bloqueado.')
    }
    return new Promise((resolve, reject) => {
      usuarioLogando.checkPassword(login.senha, (err, isMatch) => {
        if (err) throw new UnauthorizedException('Usuário ou senha incorreto.');
        if (isMatch) {
          resolve(this.createJwtPayload(usuarioLogando));
        } else {
          reject(new UnauthorizedException('Usuário ou senha incorreto.'));
        }
      });
    });
  }

  async validateUserByJwt(payload: JwtPayload) {
    let usuario = await this.usuarioService.findByEmail(payload.email);
    if (usuario) {
      return this.createJwtPayload(usuario);
    } else {
      throw new UnauthorizedException('Usuário ou senha incorreto.');
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
