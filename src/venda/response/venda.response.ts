import { Usuario } from "src/usuario/interface/usuario.interface";
import { VendaUtil } from "../util/venda.util";

export class VendaResponse {
    private _codigo: string;

    private _valor: number;

    private _data: Date;

    private _status: string;

    private _usuario: Usuario;

    constructor(codigo: string, valor: number, data: Date, status: string, usuario: Usuario) { 
        this._codigo = codigo;
        this._valor = valor;
        this._data = data;
        this._status = status;
        this._usuario = usuario;
    }

    get codigo() {
        return this._codigo;
    }

    set codigo(codigo: string) {
        this._codigo = codigo;
    }

    get valor() {
        return this._valor;
    }

    set valor(valor: number) {
        this._valor = valor;
    }

    get data() {
        return this._data;
    }

    set data(data: Date) {
        this._data = data;
    }

    get status() {
        return VendaUtil.getStatusDesc(this._status);
    }

    set status(status: string) {
        this._status = status;
    }

    get usuario() {
        return this._usuario;
    }

    set usuario(usuario: Usuario) {
        this._usuario = usuario;
    }

    get percCashback() {
        return VendaUtil.calcPercCashback(this._valor);
    }

    get valorCashback() {
        return VendaUtil.calcValorCashback(this._valor);
    }
}