import { IsDateString, IsEmail, IsNumberString, IsPhoneNumber, IsString, IsOptional } from "class-validator";

export class CreateMotoristaDto {
    @IsNumberString()
    cpf: string;

    @IsNumberString()
    cnh: string;

    @IsString()
    nome: string;

    @IsDateString()
    nascimento: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber("BR")
    telefone: string;

    @IsString()
    turnoTrabalho: string;

    @IsString()
    rotaTrabalho: string;

    // Endereço Residencial
    @IsString()
    cepResidencial: string;

    @IsString()
    bairroResidencial: string;

    @IsString()
    logradouroResidencial: string;

    @IsString()
    numeroResidencial: string;

    @IsString()
    complementoResidencial: string;

    @IsString()
    cidadeResidencial: string;

    @IsString()
    estadoResidencial: string;

    @IsString()
    @IsOptional()
    veiculoId: string; 
}
