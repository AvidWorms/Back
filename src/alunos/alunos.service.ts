import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from './entities/aluno.entity';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(Aluno)
    private readonly repository: Repository<Aluno>
  ) {}

  async create(dto: CreateAlunoDto) {
    // Verifica a existência de CPF e e-mail únicos
    const existingAluno = await this.repository.findOne({
      where: [
        { cpf: dto.cpf },
        { email: dto.email },
      ],
    });
    if (existingAluno) {
      throw new BadRequestException('CPF ou email já estão em uso.');
    }

    const aluno = this.repository.create(dto);
    return this.repository.save(aluno);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateAlunoDto) {
    const aluno = await this.repository.findOneBy({ id });
    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado.`);
    }

    // Verifica a existência de CPF e e-mail únicos em outros registros
    if (dto.cpf || dto.email) {
      const existingAluno = await this.repository.findOne({
        where: [
          { cpf: dto.cpf },
          { email: dto.email },
        ],
      });
      
      if (existingAluno && existingAluno.id !== id) {
        throw new BadRequestException('CPF ou email já estão em uso por outro aluno.');
      }
    }

    this.repository.merge(aluno, dto);
    const result = await this.repository.save(aluno);
    return result;
  }

  async remove(id: string) {
    const aluno = await this.repository.findOneBy({ id });
    if (!aluno) return null;
    return this.repository.remove(aluno);
  }
}
