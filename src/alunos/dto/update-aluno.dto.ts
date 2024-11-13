import { PartialType } from '@nestjs/mapped-types';
import { CreateAlunoDto } from './create-aluno.dto';

export class UpdateAlunoDto extends PartialType(CreateAlunoDto) {} // Extende CreateAlunoDto com todos os campos opcionais
