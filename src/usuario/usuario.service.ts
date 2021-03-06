import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../common/enum/role.enum';
import { Util } from '../common/util/util';
import { UsuarioDto } from './dto/usuario.dto';
import { Usuario } from './interface/usuario.interface';

@Injectable()
export class UsuarioService {
  constructor(@InjectModel('Usuario') private usuarioModel: Model<Usuario>) { }

  async create(usuarioDto: UsuarioDto) {
    usuarioDto.cpf = Util.removeMaskCpf(usuarioDto.cpf)
    usuarioDto.roles = [Role.basico];
    usuarioDto.status = true;
    let usuarioCriado = new this.usuarioModel(usuarioDto);
    return await usuarioCriado.save();
  }

  async findByEmail(email): Model<Usuario> {
    return await this.usuarioModel.findOne({ email: email, status: true });
  }

  async findByCpf(cpf): Model<Usuario> {
    cpf = Util.removeMaskCpf(cpf)
    return await this.usuarioModel.findOne({ cpf: cpf });
  }
}