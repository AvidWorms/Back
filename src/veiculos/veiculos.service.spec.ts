import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosService } from './veiculos.service';

describe('VeiculosService', () => {
  let service: VeiculosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeiculosService],
    }).compile();

    service = module.get<VeiculosService>(VeiculosService);
  });

  // Verifica se o serviço está definido
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
