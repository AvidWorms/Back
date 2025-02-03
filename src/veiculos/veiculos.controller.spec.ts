import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosController } from './veiculos.controller';
import { VeiculosService } from './veiculos.service';

describe('VeiculosController', () => {
  let controller: VeiculosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeiculosController],
      providers: [VeiculosService],
    }).compile();

    controller = module.get<VeiculosController>(VeiculosController);
  });

  // Verifica se o controlador está definido
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
