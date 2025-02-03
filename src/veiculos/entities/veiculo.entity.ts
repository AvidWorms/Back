import { BeforeInsert, Column, Entity, PrimaryColumn, Unique, OneToOne, JoinColumn } from "typeorm";
const { nanoid } = require("nanoid");
import { Motorista } from '../../motoristas/entities/motorista.entity';

@Unique(['placa', 'numeroChassi', 'renavam']) // Garante que estas informações sejam únicas
@Entity('veiculos') // Define a entidade 'veiculos'
export class Veiculo {
    @PrimaryColumn()
    id: string;

    @Column()
    marca: string;

    @Column()
    modelo: string;

    @Column()
    anoFabricacao: string;

    @Column()
    cor: string;

    @Column()
    tipoCombustivel: string;

    @Column()
    placa: string;

    @Column()
    numeroChassi: string;

    @Column()
    renavam: string;

    @Column()
    capacidadePassageiros: string;

    @OneToOne(() => Motorista, motorista => motorista.veiculo)
    motorista: Motorista;

    @BeforeInsert()
    generateId() {
        this.id = `vcl_${nanoid()}`; // Gera um ID único antes de inserir.
    }
}
