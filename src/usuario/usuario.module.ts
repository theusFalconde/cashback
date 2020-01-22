import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsuarioSchema } from './schema/usuario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Usuario', schema: UsuarioSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService]
})
export class UsuarioModule {}
