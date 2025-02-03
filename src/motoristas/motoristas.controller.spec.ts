import { Test, TestingModule } from '@nestjs/testing';
import { MotoristasController } from './motoristas.controller';
import { MotoristasService } from './motoristas.service';

describe('MotoristasController', () => {
  let controller: MotoristasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotoristasController],
      providers: [MotoristasService],
    }).compile();

    controller = module.get<MotoristasController>(MotoristasController);
  });

  // Verifica se o controlador está definido
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
