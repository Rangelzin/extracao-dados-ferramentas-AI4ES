package com.hotel.model;

/**
 * Entidade de Domínio Hóspede.
 * Representa o cliente do hotel.
 * Decisão: CPF é utilizado como identificador único natural nas regras de negócio.
 */
public class Hospede {
    private String nome;
    private String sobrenome;
    private String cpf;
    private String email;

    public Hospede() {
        // Necessário para desserialização
    }

    public Hospede(String nome, String sobrenome, String cpf, String email) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cpf = cpf;
        this.email = email;
    }

    // Getters e Setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getSobrenome() { return sobrenome; }
    public void setSobrenome(String sobrenome) { this.sobrenome = sobrenome; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
