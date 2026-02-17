package com.example.model;

import java.util.ArrayList;
import java.util.List;

public class Quarto {
    private Long id;
    private String tipo;
    private Double preco;
    private List<String> camas;
    private String disponibilidade; // Ocupado, Livre, Manutenção, Limpeza
    private String localizacao; // Ex: "Sala 1", "Sala 2", "Sala 3"
    private String descricao; // Ex: "Quarto com vista para o mar"

    public Quarto() {
        this.camas = new ArrayList<>();
        this.disponibilidade = "Livre";
    }

    public Quarto(Long id, String tipo, Double preco) {
        this.id = id;
        this.tipo = tipo;
        this.preco = preco;
    }

    public Quarto(Long id, String tipo, Double preco, List<String> camas, String disponibilidade) {
        this.id = id;
        this.tipo = tipo;
        this.preco = preco;
        this.camas = camas;
        this.disponibilidade = disponibilidade;
    }

    public Quarto(Long id, String tipo, Double preco, String localizacao, String descricao) {
        this.id = id;
        this.tipo = tipo;
        this.preco = preco;
        this.localizacao = localizacao;
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public List<String> getCamas() {
        return camas;
    }

    public void setCamas(List<String> camas) {
        this.camas = camas;
    }

    public String getDisponibilidade() {
        return disponibilidade;
    }

    public void setDisponibilidade(String disponibilidade) {
        this.disponibilidade = disponibilidade;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public String toString() {
        return "Quarto{" +
                "id=" + id +
                ", tipo='" + tipo + '\'' +
                ", preco=" + preco +
                ", camas=" + camas +
                ", disponibilidade='" + disponibilidade + '\'' +
                ", localizacao='" + localizacao + '\'' +
                ", descricao='" + descricao + '\'' +
                '}';
    }
}