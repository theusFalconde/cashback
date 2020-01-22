import { Body, Controller, InternalServerErrorException, Post, UseFilters, UseGuards, Put, Param, Delete, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { VendaDto } from './dto/venda.dto';
import { VendaService } from './venda.service';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

@ApiBearerAuth()
@ApiTags('Venda')
@Controller('venda')
@UseFilters(HttpExceptionFilter)
export class VendaController {
    constructor(private vendaService: VendaService) { }

    @Post()
    @UseGuards(AuthGuard())
    async create(@Body() vendaDto: VendaDto) {
        try {
            return await this.vendaService.create(vendaDto);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async update(@Param('id') id: string, @Body() vendaDto: VendaDto) {
        try {
            return await this.vendaService.update(id, vendaDto);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('admin')
    async delete(@Param('id') id: string) {
        try {
            return await this.vendaService.delete(id);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Get()
    async findAll() {
        return await this.vendaService.findAllForResponse();
    }

    @Get(':cpf')
    async findByCpf(@Param('cpf') cpf: string) {
        return await this.vendaService.findByCpfForResponse(cpf);
    }

    @Get('/acumulado/:cpf')
    async findCashbackAcumuladoByCpf(@Param('cpf') cpf: string) {
        return await this.vendaService.findCashbackAcumuladoByCpf(cpf);
    }
}
