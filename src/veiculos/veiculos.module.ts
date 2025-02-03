import { Module, forwardRef } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { VeiculosController } from './veiculos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from './entities/veiculo.entity';
import { MotoristasModule } from '../motoristas/motoristas.module';


@Module({
  imports: [TypeOrmModule.forFeature([Veiculo]), 
  forwardRef(() => MotoristasModule)],
  exports: [TypeOrmModule],
  controllers: [VeiculosController],
  providers: [VeiculosService],
})
export class VeiculosModule {}
