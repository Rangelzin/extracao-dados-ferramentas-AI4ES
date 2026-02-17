package com.hotel.model;

import java.time.LocalDateTime;

/**
 * Entidade que representa uma Reserva no hotel.
 */
public class Reserva {
    private String id;
    private String numeroQuarto;
    private String cpfHospede;
    private LocalDateTime dataEntrada;
    private LocalDateTime dataSaida;

    public Reserva() {}

    public Reserva(String id, String numeroQuarto, String cpfHospede) {
        this.id = id;
        this.numeroQuarto = numeroQuarto;
        this.cpfHospede = cpfHospede;
        this.dataEntrada = LocalDateTime.now();
    }

    // Getters e Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNumeroQuarto() { return numeroQuarto; }
    public void setNumeroQuarto(String numeroQuarto) { this.numeroQuarto = numeroQuarto; }

    public String getCpfHospede() { return cpfHospede; }
    public void setCpfHospede(String cpfHospede) { this.cpfHospede = cpfHospede; }

    public LocalDateTime getDataEntrada() { return dataEntrada; }
    public void setDataEntrada(LocalDateTime dataEntrada) { this.dataEntrada = dataEntrada; }

    public LocalDateTime getDataSaida() { return dataSaida; }
    public void setDataSaida(LocalDateTime dataSaida) { this.dataSaida = dataSaida; }
}
