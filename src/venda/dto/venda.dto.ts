import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';
import { StatusVenda } from 'src/common/enum/vendaStatus.enum';
import { Usuario } from 'src/usuario/interface/usuario.interface';

export class VendaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Por favor preencha o Código!' })
  codigo: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(0)
  @IsNotEmpty({ message: 'Por favor preencha o Valor!' })
  valor: number;

  @ApiProperty()
  @IsDateString({
    message:
      'Por favor preencha a data com o formato "yyyy-MM-ddTHH:mm:ss.SSS"',
  })
  @IsNotEmpty({ message: 'Por favor preencha o Data!' })
  data: Date;

  @ApiProperty()
  @MaxLength(11)
  @IsString()
  @IsNotEmpty({ message: 'Por favor preencha o CPF do Revendedor!' })
  cpf: string;

  @ApiProperty({ default: StatusVenda.validacao, enum: StatusVenda })
  @IsString()
  status: string;

  usuario: Usuario;
}
