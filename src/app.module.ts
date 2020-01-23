import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { VendaModule } from './venda/venda.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mongo:mongo@cashback-8ty2m.mongodb.net/cashback?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    ),
    UsuarioModule,
    AuthModule,
    HttpModule,
    VendaModule,
  ]
})
export class AppModule {}
