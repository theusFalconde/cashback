import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UsuarioDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Por favor preencha o Nome!' })
  nome: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Por favor preencha o CPF!' })
  cpf: string;

  @ApiProperty()
  @IsString()
  @IsEmail({}, { message: 'E-mail inválido!' })
  @IsNotEmpty({ message: 'Por favor preencha o Email!' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Por favor preencha a Senha!' })
  senha: string;

  status: Boolean;

  roles: Array<string>;
}
