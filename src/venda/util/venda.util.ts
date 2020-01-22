import { StatusVenda } from "../constant/statusVenda.const";

export class VendaUtil {
    static calcPercCashback(valor) {
        if (valor > 0 && valor < 1000) {
            return 10;
        } else if (valor >= 1000 && valor < 1500) {
            return 15;
        } else if (valor >= 1500) {
            return 20;
        } else {
            return 0;
        }
    }

    static calcValorCashback(valor) {
        let perc = this.calcPercCashback(valor);
        if (perc > 0) {
            return (valor * perc) / 100;
        } else {
            return 0;
        }
    }

    static getStatusDesc(statusVenda) {
        for (let status in StatusVenda) {
            if (StatusVenda[status].key === statusVenda) {
                return StatusVenda[status].value
            }
        }
        return ''
    }
}