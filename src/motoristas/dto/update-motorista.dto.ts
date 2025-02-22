import { PartialType } from '@nestjs/mapped-types';
import { CreateMotoristaDto } from './create-motorista.dto';

export class UpdateMotoristaDto extends PartialType(CreateMotoristaDto) {} // Extende CreateMotoristaDto com todos os campos opcionais
