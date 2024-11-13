import { BeforeInsert, Column, Entity, PrimaryColumn, Unique } from "typeorm";
const { nanoid } = require("nanoid");

@Unique(['cpf', 'email']) // Garante que os campos CPF e email sejam únicos
@Entity('alunos') // Define a entidade 'alunos'
export class Aluno {
    @PrimaryColumn()
    id: string;

    @Column()
    cpf: string;

    @Column()
    nome: string;

    @Column()
    nascimento: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    turnoEstudo: string;

    @Column()
    codigoTurma: string;

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

    // Endereço da Instituição
    @Column()
    nomeInstituicao: string;

    @Column()
    cepInstituicao: string;

    @Column()
    bairroInstituicao: string;

    @Column()
    logradouroInstituicao: string;

    @Column()
    numeroInstituicao: string;

    @Column({ nullable: true })
    complementoInstituicao: string;

    @Column()
    cidadeInstituicao: string;

    @Column()
    estadoInstituicao: string;

    @BeforeInsert()
    generateId() {
        this.id = `aln_${nanoid()}`; // Gera um ID único antes de inserir.
    }
}
