import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { VendaSchema } from './schema/venda.schema';
import { VendaController } from './venda.controller';
import { VendaService } from './venda.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Venda', schema: VendaSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    HttpModule,
    UsuarioModule,
  ],
  controllers: [VendaController],
  providers: [VendaService],
  exports: [VendaService]
})
export class VendaModule {}
