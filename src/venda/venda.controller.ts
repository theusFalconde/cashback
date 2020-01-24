import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorator/roles.decorator';
import { HttpExceptionFilter } from '../common/filter/http-exception.filter';
import { RolesGuard } from '../common/guard/roles.guard';
import { VendaDto } from './dto/venda.dto';
import { VendaService } from './venda.service';

@ApiTags('Venda')
@Controller('venda')
@UseFilters(HttpExceptionFilter)
export class VendaController {
  constructor(private vendaService: VendaService) {}

  @ApiBearerAuth()
  @HttpCode(201)
  @Post('/criarVenda')
  @UseGuards(AuthGuard())
  async create(@Body() vendaDto: VendaDto) {
    try {
      return await this.vendaService.create(vendaDto);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Put('/atualizarVenda/:id')
  @UseGuards(AuthGuard())
  async update(@Param('id') id: string, @Body() vendaDto: VendaDto) {
    try {
      await this.vendaService.update(id, vendaDto);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete('/deletarVenda/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async delete(@Param('id') id: string) {
    try {
      await this.vendaService.delete(id);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @ApiBearerAuth()
  @Get('/buscarVendaPorCodigo/:codigo')
  async findByCodigo(@Param('codigo') codigo: string) {
    return await this.vendaService.findByCodigoForResponse(codigo);
  }

  @ApiBearerAuth()
  @Get('/buscarTodasVendas')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async findAll() {
    return await this.vendaService.findAllForResponse();
  }

  @ApiBearerAuth()
  @Get('/buscarVendasPorCpf/:cpf')
  async findByCpf(@Param('cpf') cpf: string) {
    return await this.vendaService.findByCpfForResponse(cpf);
  }

  @Get('/buscarCashbackAcumulado/:cpf')
  async findCashbackAcumuladoByCpf(@Param('cpf') cpf: string) {
    return await this.vendaService.findCashbackAcumuladoByCpf(cpf);
  }
}
