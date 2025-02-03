import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MotoristasService } from './motoristas.service';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';

@Controller('motoristas')
export class MotoristasController {
  constructor(private readonly motoristasService: MotoristasService) {}

  // Rota POST para criar um novo motorista
  @Post()
  create(@Body() createMotoristaDto: CreateMotoristaDto) {
    return this.motoristasService.create(createMotoristaDto);
  }

  // Rota GET para buscar todos os motoristas
  @Get()
  findAll() {
    return this.motoristasService.findAll();
  }

  // Rota GET para buscar um motorista pelo ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motoristasService.findOne(id);
  }

  // Rota PATCH para atualizar os dados de um motorista
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotoristaDto: UpdateMotoristaDto) {
    return this.motoristasService.update(id, updateMotoristaDto);
  }

  // Rota DELETE para remover um motorista
  @Delete(":id")
  remove(@Param('id') id: string) {
    return this.motoristasService.remove(id);
  }
}

