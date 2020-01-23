import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { VendaSchema } from './schema/venda.schema';
import { VendaController } from './venda.controller';
import { VendaService } from './venda.service';
import { PassportModule } from '@nestjs/passport';
import { UsuarioSchema } from 'src/usuario/schema/usuario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Venda', schema: VendaSchema}, {name: 'Usuario', schema: UsuarioSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    HttpModule,
    UsuarioModule,
  ],
  controllers: [VendaController],
  providers: [VendaService],
  exports: [VendaService]
})
export class VendaModule {}
