import { BeforeInsert, Column, Entity, PrimaryColumn, Unique, OneToOne, JoinColumn } from "typeorm";
import { Veiculo } from '../../veiculos/entities/veiculo.entity';
const { nanoid } = require("nanoid");

@Unique(['cpf', 'email', 'cnh']) // Garante que os campos CPF e email sejam únicos
@Entity('motoristas') // Define a entidade 'motoristas'
export class Motorista {
    @PrimaryColumn()
    id: string;

    @Column()
    cpf: string;
    
    @Column()
    cnh: string;

    @Column()
    nome: string;

    @Column()
    nascimento: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    turnoTrabalho: string;
    
    @Column()
    rotaTrabalho: string;

    // Endereço Residencial
    @Column()
    cepResidencial: string;

    @Column()
    bairroResidencial: string;

    @Column()
    logradouroResidencial: string;

    @Column()
    numeroResidencial: string;

    @Column({ nullable: true })
    complementoResidencial: string;

    @Column()
    cidadeResidencial: string;

    @Column()
    estadoResidencial: string;

    @OneToOne(() => Veiculo, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn()
    veiculo: Veiculo;

    @BeforeInsert()
    generateId() {
        this.id = `mtr_${nanoid()}`; // Gera um ID único antes de inserir.
    }
}
