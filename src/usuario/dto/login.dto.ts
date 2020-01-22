import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail({}, { message: 'E-mail inválido!' })
  @IsNotEmpty({ message: 'Por favor preencha o Email!' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Por favor preencha a Senha!' })
  senha: string;
}
