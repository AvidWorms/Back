import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculo } from './entities/veiculo.entity';
import { Motorista } from '../motoristas/entities/motorista.entity';

@Injectable()
export class VeiculosService {
  constructor(
    @InjectRepository(Veiculo)
    private readonly repository: Repository<Veiculo>,
    @InjectRepository(Motorista)
    private readonly motoristaRepository: Repository<Motorista>,
  ) {}

  // Método para criar um novo veiculo
  async create(dto: CreateVeiculoDto) {
    console.log(dto)
    // Verifica a existência de dados únicos do veículos
    const existingVeiculo = await this.repository.findOne({
      where: [
        { placa: dto.placa },
        { numeroChassi: dto.numeroChassi },
        { renavam: dto.renavam}
      ],
    });
    console.log(existingVeiculo)
    if (existingVeiculo) {
      throw new BadRequestException('Placa, número de chassi ou renavam já cadastrados');
    }

    const veiculo = this.repository.create(dto);
    return this.repository.save(veiculo);
  }

  // Método para buscar todos os veiculos
  findAll() {
    return this.repository.find();
  }

  // Método para buscar um veiculo pelo ID
  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  // Método para atualizar os dados de um veiculo
  async update(id: string, dto: UpdateVeiculoDto) {
    const veiculo = await this.repository.findOneBy({ id });
    if (!veiculo) {
      throw new NotFoundException(`Veiculo com ID ${id} não encontrado.`);
    }

    // Verifica a existência de CPF e e-mail únicos em outros registros
    if (dto.placa || dto.numeroChassi || dto.renavam) {
      const existingVeiculo = await this.repository.findOne({
        where: [
          { placa: dto.placa },
          { numeroChassi: dto.numeroChassi },
          { renavam: dto.renavam}
        ],
      });
      
      if (existingVeiculo && existingVeiculo.id !== id) {
        throw new BadRequestException('Placa, número de chassi ou renavam já estão em uso por outro veiculo.');
      }
    }

    this.repository.merge(veiculo, dto);
    const result = await this.repository.save(veiculo);
    return result;
  }

  // Método para remover um veiculo
  async remove(id: string) {
    const veiculo = await this.repository.findOne({
      where: { id },
      relations: ['motorista'],
    });

    if (!veiculo) {
      throw new NotFoundException(`Veículo com ID ${id} não encontrado.`);
    }

    // Se o veículo estiver associado a um motorista, desassocia o veículo do motorista
    if (veiculo.motorista) {
      veiculo.motorista.veiculo = null;
      await this.motoristaRepository.save(veiculo.motorista);
    }

    // Remove o veículo
    await this.repository.remove(veiculo);
  }
}
