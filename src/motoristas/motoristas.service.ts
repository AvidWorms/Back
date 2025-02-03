  import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
  import { CreateMotoristaDto } from './dto/create-motorista.dto';
  import { UpdateMotoristaDto } from './dto/update-motorista.dto';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Motorista} from './entities/motorista.entity';
  import { Veiculo } from '../veiculos/entities/veiculo.entity';
  import { Not } from 'typeorm';

  @Injectable()
  export class MotoristasService {
    constructor(
      @InjectRepository(Motorista)
      private readonly repository: Repository<Motorista>,
      @InjectRepository(Veiculo)
      private readonly veiculoRepository: Repository<Veiculo>
    ) {}

    // Método para criar um novo motorista
    async create(dto: CreateMotoristaDto) {
      const { cpf, email, cnh, veiculoId } = dto;
      const existingMotorista = await this.repository.findOne({
        where: [{ cpf }, { email }, { cnh }],
      });
  
      if (existingMotorista) {
        throw new BadRequestException(`Os seguintes dados já estão em uso por outro motorista: ${[
          existingMotorista.cpf === cpf ? 'CPF' : '',
          existingMotorista.email === email ? 'Email' : '',
          existingMotorista.cnh === cnh ? 'CNH' : ''
        ].filter(Boolean).join(', ')}`);
      }
  
      if (veiculoId) {
        if (veiculoId === "1") {
          dto.veiculoId = null;
        } else {
          const existingVeiculo = await this.veiculoRepository.findOne({ where: { id: veiculoId } });
          if (!existingVeiculo) {
            throw new NotFoundException('Veículo não encontrado.');
          }
          const veiculoUsado = await this.repository.findOne({ where: { veiculo: { id: veiculoId } } });
          if (veiculoUsado) {
            throw new BadRequestException('Veículo já está associado a outro motorista.');
          }
        }
      }
  
      const motorista = this.repository.create(dto);
      this.repository.merge(motorista, dto, {veiculo: {id: dto.veiculoId}});
      const result = await this.repository.save(motorista);
      return result;
    }
  
    // Método para buscar todos os motoristas
    findAll() {
      return this.repository.find();
    }

    // Método para buscar um motorista pelo ID
    async findOne(id: string) {
      const {veiculo, ...rest} = await this.repository.findOne({where: {id}, relations: {veiculo: true}})
      return {...rest, veiculoId: veiculo ? veiculo.id : null}
    }

    // Método para atualizar os dados de um motorista
    async update(id: string, dto: UpdateMotoristaDto) {
      const motorista = await this.repository.findOne({ where: { id } });
      if (!motorista) {
        throw new NotFoundException(`Motorista com ID ${id} não encontrado.`);
      }
  
      const { cpf, email, cnh, veiculoId } = dto;
      if (cpf || email || cnh) {
        const existingMotorista = await this.repository.findOne({
          where: [
            cpf ? { cpf } : undefined,
            email ? { email } : undefined,
            cnh ? { cnh } : undefined,
          ].filter(Boolean),
        });
  
        if (existingMotorista && existingMotorista.id !== id) {
          throw new BadRequestException(`Os seguintes dados já estão em uso por outro motorista: ${[
            existingMotorista.cpf === cpf ? 'CPF' : '',
            existingMotorista.email === email ? 'Email' : '',
            existingMotorista.cnh === cnh ? 'CNH' : ''
          ].filter(Boolean).join(', ')}`);
        }
      }
  
      if (veiculoId) {
        if (veiculoId === "1") {
          dto.veiculoId = null;
        } else {
          const existingVeiculo = await this.veiculoRepository.findOne({ where: { id: veiculoId } });
          if (!existingVeiculo) {
            throw new NotFoundException('Veículo não encontrado.');
          }
          const veiculoUsado = await this.repository.findOne({ where: { veiculo: { id: veiculoId }, id: Not(id) } });
          if (veiculoUsado) {
            throw new BadRequestException('Veículo já está associado a outro motorista.');
          }
        }
      }

      this.repository.merge(motorista, dto, {veiculo: {id: dto.veiculoId}});
      const result = await this.repository.save(motorista);
      return result;
    }

    // Método para remover um motorista
    async remove(id: string) {
      const motorista = await this.repository.findOneBy({ id });
      if (!motorista) {
        throw new NotFoundException(`Motorista com ID ${id} não encontrado.`);
      }
      if (!motorista) return null;
      return this.repository.remove(motorista);
    }
  }


  //
  