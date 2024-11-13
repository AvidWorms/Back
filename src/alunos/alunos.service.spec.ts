import { Test, TestingModule } from '@nestjs/testing';
import { AlunosService } from './alunos.service';

describe('AlunosService', () => {
  let service: AlunosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlunosService],
    }).compile();

    service = module.get<AlunosService>(AlunosService);
  });

  // Verifica se o serviço está definido
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
