import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunosModule } from './alunos/alunos.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // Configura o TypeORM com SQLite
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'transporte_escolar_db', // Nome do banco de dados
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Caminho para as entidades
      synchronize: true, // Sincroniza o banco de dados automaticamente
    }),
    AlunosModule
  ],
  controllers: [AppController], // Controladores registrados no módulo
  providers: [AppService], // Serviços registrados no módulo
})
export class AppModule {}
