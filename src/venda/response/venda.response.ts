import { Usuario } from "src/usuario/interface/usuario.interface";
import { VendaUtil } from "../util/venda.util";

export class VendaResponse {
    private id: string

    private codigo: string;

    private valor: number;

    private data: Date;

    private status: string;

    private usuario: Usuario;

    private percCashback: number;

    private valorCashback: number;

    constructor(id: string, codigo: string, valor: number, data: Date, status: string, usuario: Usuario) { 
        this.id = id
        this.codigo = codigo;
        this.valor = valor;
        this.data = data;
        this.status = VendaUtil.getStatusDesc(status);
        this.usuario = usuario;
        this.percCashback = VendaUtil.calcPercCashback(valor)
        this.valorCashback = VendaUtil.calcValorCashback(valor)
    }
}