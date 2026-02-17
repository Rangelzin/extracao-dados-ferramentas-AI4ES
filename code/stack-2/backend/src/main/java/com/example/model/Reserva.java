package com.example.model;

import java.time.LocalDate;

public class Reserva {
    private Long id;
    private Long quartoId;
    private Long hospedeId;
    private LocalDate dataEntrada;
    private LocalDate dataSaida;

    public Reserva() {}

    public Reserva(Long id, Long quartoId, Long hospedeId, LocalDate dataEntrada, LocalDate dataSaida) {
        this.id = id;
        this.quartoId = quartoId;
        this.hospedeId = hospedeId;
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuartoId() {
        return quartoId;
    }

    public void setQuartoId(Long quartoId) {
        this.quartoId = quartoId;
    }

    public Long getHospedeId() {
        return hospedeId;
    }

    public void setHospedeId(Long hospedeId) {
        this.hospedeId = hospedeId;
    }

    public LocalDate getDataEntrada() {
        return dataEntrada;
    }

    public void setDataEntrada(LocalDate dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public LocalDate getDataSaida() {
        return dataSaida;
    }

    public void setDataSaida(LocalDate dataSaida) {
        this.dataSaida = dataSaida;
    }
}