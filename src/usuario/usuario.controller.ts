import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  UseFilters,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from './../common/decorator/roles.decorator';
import { Role } from '../common/enum/role.enum';
import { HttpExceptionFilter } from '../common/filter/http-exception.filter';

@ApiBearerAuth()
@ApiTags('Usuario')
@Controller('usuario')
@UseFilters(HttpExceptionFilter)
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() usuarioDto: UsuarioDto) {
    try {
      usuarioDto.status = true;
      usuarioDto.roles = [Role.Basico];
      return await this.usuarioService.create(usuarioDto);
    } catch (err) {
      throw new InternalServerErrorException('Usuário já cadastrado!');
    }
  }

  @Get('test')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  testAuthRoute() {
    return {
      message: 'You did it!',
    };
  }
}
