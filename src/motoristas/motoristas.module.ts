import { Module, forwardRef } from '@nestjs/common';
import { MotoristasService } from './motoristas.service';
import { MotoristasController } from './motoristas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motorista } from './entities/motorista.entity';
import { VeiculosModule } from '../veiculos/veiculos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Motorista]), 
  forwardRef(() => VeiculosModule)],
  exports: [TypeOrmModule],
  controllers: [MotoristasController],
  providers: [MotoristasService],
})
export class MotoristasModule {}
