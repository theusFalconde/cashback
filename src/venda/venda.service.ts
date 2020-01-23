import { BadRequestException, HttpService, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusVenda } from 'src/common/enum/vendaStatus.enum';
import { Usuario } from 'src/usuario/interface/usuario.interface';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Util } from '../common/util/util';
import { VendaDto } from './dto/venda.dto';
import { Venda } from './interface/venda.interface';
import { VendaResponse } from './response/venda.response';
import { VendaUtil } from './util/venda.util';
import { map } from 'rxjs/operators';

@Injectable()
export class VendaService {
    constructor(@InjectModel('Venda') private vendaModel: Model<Venda>,
        @InjectModel('Usuario') private usuarioModel: Model<Usuario>,
        private usuarioService: UsuarioService,
        private httpService: HttpService) { }

    async create(vendaDto: VendaDto) {
        if (await this.verificarCodigoVendaExiste(vendaDto.codigo)) {
            vendaDto.cpf = Util.removeMaskCpf(vendaDto.cpf)
            let usuario = await this.verificarUsuario(vendaDto.cpf)
            if (VendaUtil.cpfAprovado === vendaDto.cpf) {
                vendaDto.status = StatusVenda.aprovado;
            } else {
                vendaDto.status = StatusVenda.validacao;
            }
            vendaDto.usuario = usuario
            let vendaCriada = new this.vendaModel(vendaDto);
            return await vendaCriada.save();
        }
    }

    async update(id: string, vendaDto: VendaDto) {
        if (await this.verificarVendaUpdate(id)) {
            vendaDto.cpf = Util.removeMaskCpf(vendaDto.cpf)
            let usuario = await this.verificarUsuario(vendaDto.cpf)
            vendaDto.usuario = usuario
            let vendaAtualizada = this.vendaModel.findByIdAndUpdate(id, vendaDto, { new: true });
            return vendaAtualizada;
        }
    }

    async delete(id: string) {
        if (this.verificarVendaDelete(id)) {
            let vendaDeletada = this.vendaModel.findByIdAndRemove(id);
            return vendaDeletada;
        }
    }

    async findCashbackAcumuladoByCpf(cpf) {
        let headerRequest = { 'Authorization': VendaUtil.tokenApiExterna }
        let response = await this.httpService.get(VendaUtil.urlApiExterna + cpf, { headers: headerRequest })
            .toPromise();
        let valor = response.data.body.credit
        return { 
            codigo: Math.random(), 
            valor: valor, 
            data: new Date(), 
            status: 'Consulta externa', 
            cpf: cpf,
            percCashback: VendaUtil.calcPercCashback(valor),
            valorCashback: VendaUtil.calcValorCashback(valor)
        }
    }

    async findById(id): Model<Venda> {
        return await this.vendaModel.findById(id).populate('usuario', this.usuarioModel).exec();
    }

    async findByCodigo(codigo): Model<Venda> {
        return await this.vendaModel.findOne({ codigo: codigo }).populate('usuario', this.usuarioModel).exec();
    }

    async findByCpf(cpf): Promise<Venda[]> {
        cpf = Util.removeMaskCpf(cpf)
        let usuario = await this.usuarioService.findByCpf(cpf)
        return await this.vendaModel.find({ "usuario": usuario.id }).populate('usuario', this.usuarioModel).exec();
    }

    async findAll(): Promise<Venda[]> {
        return await this.vendaModel.find().populate('usuario', this.usuarioModel).exec();
    }

    async findAllForResponse() {
        let vendas = await this.findAll();
        return this.modelToResponse(vendas);
    }

    async findByCpfForResponse(cpf) {
        let vendas = await this.findByCpf(cpf);
        return this.modelToResponse(vendas);
    }

    async findByCodigoForResponse(codigo) {
        let venda = await this.findByCodigo(codigo);
        return new VendaResponse(venda.id, venda.codigo, venda.valor, venda.data, venda.status, venda.usuario);
    }

    modelToResponse(vendas) {
        return vendas.map(v => new VendaResponse(v.id, v.codigo, v.valor, v.data, v.status, v.usuario));
    }

    async verificarUsuario(cpf): Model<Usuario> {
        let usuario = await this.usuarioService.findByCpf(cpf)
        if (!usuario) {
            throw new NotFoundException('Nenhum revendedor cadastrado com esse CPF')
        }
        return usuario;
    }

    async verificarVendaUpdate(id) {
        let venda = await this.findById(id);
        if (!venda) {
            throw new NotFoundException('Nenhuma venda encontrada com esse id')
        } else if (this.verificarStatusVendaValido(venda.status)) {
            throw new NotAcceptableException('Status da venda inválido')
        } else if (venda.status !== StatusVenda.validacao) {
            throw new BadRequestException('Não é possível alterar o registro com o status "APROVADO"')
        }
        return true;
    }

    async verificarVendaDelete(id) {
        let venda = await this.findById(id);
        if (!venda) {
            throw new NotFoundException('Nenhuma venda encontrada com esse id')
        } else if (venda.status !== StatusVenda.validacao) {
            throw new NotAcceptableException('Não é possível deletar um registro com status diferente de "Em validação"')
        }
        return true
    }

    verificarStatusVendaValido(statusVenda) {
        for (let status in StatusVenda) {
            console.log(StatusVenda[status] == statusVenda)
            if (StatusVenda[status] == statusVenda) {
                return false
            }
        }
        return true;
    }

    async verificarCodigoVendaExiste(codigo) {
        let venda = await this.findByCodigo(codigo);
        if (venda) {
            throw new BadRequestException(`Já existe uma venda com o código ${codigo}`)
        }
        return true
    }

}
