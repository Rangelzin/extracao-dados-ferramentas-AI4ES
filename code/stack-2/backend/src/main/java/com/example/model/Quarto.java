package com.example.model;

public class Quarto {
    private Long id;
    private String tipo;
    private Double preco;

    public Quarto() {}

    public Quarto(Long id, String tipo, Double preco) {
        this.id = id;
        this.tipo = tipo;
        this.preco = preco;
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
}