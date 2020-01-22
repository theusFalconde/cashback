import { BadRequestException, Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/filter/http-exception.filter';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuarioService } from './usuario.service';

@ApiBearerAuth()
@ApiTags('Usuario')
@Controller('usuario')
@UseFilters(HttpExceptionFilter)
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() usuarioDto: UsuarioDto) {
    try {
      return await this.usuarioService.create(usuarioDto);
    } catch (err) {
      throw new BadRequestException('Usuário já cadastrado!');
    }
  }
}
