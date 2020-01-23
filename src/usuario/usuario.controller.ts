import { BadRequestException, Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/filter/http-exception.filter';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuarioService } from './usuario.service';

@ApiTags('Usuario')
@Controller('usuario')
@UseFilters(HttpExceptionFilter)
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post('criar')
  async create(@Body() usuarioDto: UsuarioDto) {
    try {
      return await this.usuarioService.create(usuarioDto);
    } catch (err) {
      throw new BadRequestException('Usuário já cadastrado!');
    }
  }
}
