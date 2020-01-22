import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/common/enum/role.enum';
import { UsuarioDto } from './dto/usuario.dto';
import { Usuario } from './interface/usuario.interface';

@Injectable()
export class UsuarioService {
  constructor(@InjectModel('Usuario') private usuarioModel: Model<Usuario>) { }

  async create(usuarioDto: UsuarioDto) {
    usuarioDto.status = true;
    usuarioDto.roles = [Role.basico];
    let usuarioCriado = new this.usuarioModel(usuarioDto);
    return await usuarioCriado.save();
  }

  async findByEmail(email): Model<Usuario> {
    return await this.usuarioModel.findOne({ email: email });
  }

  async findByCpf(cpf): Model<Usuario> {
    return await this.usuarioModel.findOne({ cpf: cpf });
  }
}
