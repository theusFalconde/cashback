export interface Usuario {
  readonly id: string;
  readonly nome: string;
  readonly cpf: string;
  readonly email: string;
  readonly status: boolean;
  readonly roles: Array<string>;
}
