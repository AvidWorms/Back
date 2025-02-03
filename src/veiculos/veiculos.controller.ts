import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly veiculosService: VeiculosService) {}

  // Rota POST para criar um novo veiculo
  @Post()
  create(@Body() createVeiculoDto: CreateVeiculoDto) {
    return this.veiculosService.create(createVeiculoDto);
  }

  // Rota GET para buscar todos os veiculos
  @Get()
  findAll() {
    return this.veiculosService.findAll();
  }

  // Rota GET para buscar um veiculo pelo ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.veiculosService.findOne(id);
  }

  // Rota PATCH para atualizar os dados de um veiculo
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVeiculoDto: UpdateVeiculoDto) {
    return this.veiculosService.update(id, updateVeiculoDto);
  }

  // Rota DELETE para remover um veiculo
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.veiculosService.remove(id);
  }
}

