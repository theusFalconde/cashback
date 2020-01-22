import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './interface/usuario.interface';
import { UsuarioDto } from './dto/usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(@InjectModel('Usuario') private usuarioModel: Model<Usuario>) {}

  async create(usuarioDto: UsuarioDto) {
    let usuarioCriado = new this.usuarioModel(usuarioDto);
    return await usuarioCriado.save();
  }

  async findByEmail(email): Model<Usuario> {
    return await this.usuarioModel.findOne({ email: email });
  }
}
