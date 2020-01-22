import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class VendaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Por favor preencha o Nome!' })
  codigo: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'Por favor preencha o Valor!' })
  valor: number;

  @ApiProperty()
  @IsDateString({
    message:
      'Por favor preencha a data com o formato "yyyy-MM-ddTHH:mm:ss.SSS"',
  })
  data: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Por favor preencha o CPF do Revendedor!' })
  cpf: string;

  status: string;
}
