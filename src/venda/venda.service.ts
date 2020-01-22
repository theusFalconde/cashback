import { BadRequestException, Injectable, NotFoundException, NotAcceptableException, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusVenda } from 'src/venda/constant/statusVenda.const';
import { UsuarioService } from 'src/usuario/usuario.service';
import { VendaConstante } from './constant/venda.constant';
import { VendaDto } from './dto/venda.dto';
import { Venda } from './interface/venda.interface';
import { Usuario } from 'src/usuario/interface/usuario.interface';
import { VendaResponse } from './response/venda.response';

@Injectable()
export class VendaService {
    constructor(@InjectModel('Venda') private vendaModel: Model<Venda>, 
                private usuarioService: UsuarioService,
                private readonly httpService: HttpService) { }

    async create(vendaDto: VendaDto) {
        let usuario = await this.verificarUsuario(vendaDto.cpf)
        if (VendaConstante.cpfAprovado === vendaDto.cpf) {
            vendaDto.status = StatusVenda.aprovado.key;
        } else {
            vendaDto.status = StatusVenda.validacao.key;
        }
        vendaDto.usuario = usuario
        let vendaCriada = new this.vendaModel(vendaDto);
        return await vendaCriada.save();
    }

    async update(id: string, vendaDto: VendaDto) {
        if (await this.verificarVendaUpdate(id)) {
            let usuario = this.verificarUsuario(vendaDto.cpf)
            vendaDto.usuario = usuario
            let vendaAtualizada = new this.vendaModel.findByIdAndUpdate(id, vendaDto, { new: true });
            return vendaAtualizada;
        }
    }

    async delete(id: string) {
        if(this.verificarVendaDelete(id)) {
            let vendaDeletada = new this.vendaModel.findByIdAndRemove(id);
            return vendaDeletada;
        }
    }

    async findCashbackAcumuladoByCpf(cpf) {
        let retornoApi = await this.httpService.get(`https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=${cpf}`)
        console.log('Retorno API externa: ', retornoApi)
        return retornoApi
    }

    async findById(id): Model<Venda> {
        return await this.vendaModel.findOne({ id: id });
    }

    async findByCodigo(codigo): Model<Venda> {
        return await this.vendaModel.findOne({ codigo: codigo });
    }

    async findByCpf(cpf): Promise<Venda[]> {
        return await this.vendaModel.find({ "usuario.cpf": cpf });
    }

    async findAll(): Promise<Venda[]> {
        return await this.vendaModel.find().exec();
    }

    async findAllForResponse() {
        let vendas = await this.findAll();
        return this.modelToResponse(vendas);;
    }

    async findByCpfForResponse(cpf) {
        let vendas = await this.findByCpf(cpf);
        return this.modelToResponse(vendas);
    }

    modelToResponse(vendas) {
        return vendas.map(v => new VendaResponse(v.codigo, v.valor, v.data, v.status, v.usuario));
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
        } else if (venda.status !== StatusVenda.validacao.key) {
            throw new BadRequestException('Não é possível alterar o registro com o status "APROVADO"')
        }
        return true;
    }

    async verificarVendaDelete(id) {
        let venda = await this.findById(id);
        if (!venda) {
            throw new NotFoundException('Nenhuma venda encontrada com esse id')
        } else if(venda.status !== StatusVenda.validacao.key) {
            throw new NotAcceptableException('Não é possível deletar um registro com status diferente de "Em validação"')
        }
        return true
    }

    verificarStatusVendaValido(statusVenda) {
        for (let status in StatusVenda) {
            if (StatusVenda[status].key === statusVenda) {
                return true
            }
        }
        return false;
    }

}
