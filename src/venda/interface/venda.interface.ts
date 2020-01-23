import { Usuario } from '../../usuario/interface/usuario.interface';

export interface Venda {
  readonly id: string;
  readonly codigo: string;
  readonly valor: number;
  readonly data: Date;
  readonly usuario: Usuario;
  readonly status: string;
}
