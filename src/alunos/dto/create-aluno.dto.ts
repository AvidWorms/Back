import { IsDateString, IsEmail, IsNumberString, IsPhoneNumber, IsString } from "class-validator";

export class CreateAlunoDto {
    @IsNumberString()
    cpf: string;

    @IsString()
    nome: string;

    @IsDateString()
    nascimento: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber("BR")
    telefone: string;

    @IsString()
    turnoEstudo: string;

    @IsString()
    codigoTurma: string;

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

    // Endereço da Instituição
    @IsString()
    nomeInstituicao: string;

    @IsString()
    cepInstituicao: string;

    @IsString()
    bairroInstituicao: string;

    @IsString()
    logradouroInstituicao: string;

    @IsString()
    numeroInstituicao: string;

    @IsString()
    complementoInstituicao: string;

    @IsString()
    cidadeInstituicao: string;

    @IsString()
    estadoInstituicao: string;
}
