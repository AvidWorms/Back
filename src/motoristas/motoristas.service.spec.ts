import { Test, TestingModule } from '@nestjs/testing';
import { MotoristasService } from './motoristas.service';

describe('MotoristasService', () => {
  let service: MotoristasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotoristasService],
    }).compile();

    service = module.get<MotoristasService>(MotoristasService);
  });

  // Verifica se o serviço está definido
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
