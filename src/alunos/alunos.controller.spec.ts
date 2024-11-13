import { Test, TestingModule } from '@nestjs/testing';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';

describe('AlunosController', () => {
  let controller: AlunosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunosController],
      providers: [AlunosService],
    }).compile();

    controller = module.get<AlunosController>(AlunosController);
  });

  // Verifica se o controlador está definido
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
