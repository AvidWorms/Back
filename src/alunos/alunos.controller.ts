import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  // Rota POST para criar um novo aluno
  @Post()
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunosService.create(createAlunoDto);
  }

  // Rota GET para buscar todos os alunos
  @Get()
  findAll() {
    return this.alunosService.findAll();
  }

  // Rota GET para buscar um aluno pelo ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alunosService.findOne(id);
  }

  // Rota PATCH para atualizar os dados de um aluno
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunosService.update(id, updateAlunoDto);
  }

  // Rota DELETE para remover um aluno
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alunosService.remove(id);
  }
}

