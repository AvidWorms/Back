import { IsDateString, IsString, IsOptional } from "class-validator";

export class CreateVeiculoDto {
        @IsString()
        marca: string;

        @IsString()
        modelo: string;

        @IsDateString()
        anoFabricacao: string;

        @IsString()
        cor: string;

        @IsString()
        tipoCombustivel: string;

        @IsString()
        placa: string;

        @IsString()
        numeroChassi: string;

        @IsString()
        renavam: string;

        @IsString()
        capacidadePassageiros: string;

        @IsString()
        @IsOptional()
        motoristaId: string; 
}
