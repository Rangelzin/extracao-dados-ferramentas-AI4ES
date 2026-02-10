export class Hospede {
    private id: string;
    private nome: string;
    private sobrenome: string;
    private cpf: string;
    private email: string;

    constructor(id: string, nome: string, sobrenome: string, cpf: string, email: string) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cpf = cpf;
        this.email = email;
        
        this.validar();
    }

    private validar(): void {
        if (!this.nome || this.nome.trim().length === 0) {
            throw new Error("Nome é obrigatório.");
        }
        if (!this.cpf) {
            throw new Error("CPF é obrigatório.");
        }
        if (!this.email || !this.email.includes('@')) {
            throw new Error("Email inválido.");
        }
    }

    public getId(): string {
        return this.id;
    }

    public getNomeCompleto(): string {
        return `${this.nome} ${this.sobrenome}`;
    }

    public getCpf(): string {
        return this.cpf;
    }

    public getEmail(): string {
        return this.email;
    }
}
