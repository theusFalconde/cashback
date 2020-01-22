import { Usuario } from 'src/usuario/interface/usuario.interface';

export interface Venda {
  readonly id: string;
  readonly codigo: string;
  readonly valor: number;
  readonly data: Date;
  readonly cpf: string;
  readonly status: string;
}
