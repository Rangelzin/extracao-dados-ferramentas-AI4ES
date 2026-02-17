package com.example.model;

import java.util.ArrayList;
import java.util.List;

public class Quarto {
    // Unique identifier for the room
    private Long id;

    // Type of the room (e.g., Deluxe, Standard)
    private String tipo;

    // Price per hour for the room
    private Double preco;

    // List of bed types available in the room
    private List<String> camas;

    // Availability status of the room (e.g., Livre, Ocupado)
    private String disponibilidade;

    // Default constructor initializes default values for new rooms
    public Quarto() {
        this.camas = new ArrayList<>();
        this.disponibilidade = "Livre";
    }

    // Parameterized constructor for creating a room with specific attributes
    public Quarto(Long id, String tipo, Double preco, List<String> camas, String disponibilidade) {
        this.id = id;
        this.tipo = tipo;
        this.preco = preco;
        this.camas = camas;
        this.disponibilidade = disponibilidade;
    }

    // Getters and setters follow the principle of encapsulation
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

    @Override
    public String toString() {
        // Provides a string representation of the Quarto object for debugging and
        // logging
        return "Quarto{" +
                "id=" + id +
                ", tipo='" + tipo + '\'' +
                ", preco=" + preco +
                ", camas=" + camas +
                ", disponibilidade='" + disponibilidade + '\'' +
                '}';
    }
}