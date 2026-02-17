package com.hotel.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(optional = false)
    private Quarto quarto;

    @ManyToOne(optional = false)
    private Hospede hospede;

    @Column(nullable = false)
    private LocalDate dataCheckIn;

    @Column(nullable = false)
    private LocalDate dataCheckOut;

    @Column(nullable = false)
    private BigDecimal valorTotal;

    @Enumerated(EnumType.STRING)
    private StatusReserva status;

    // Business Logic
    public void calcularValorTotal() {
        if (quarto != null && dataCheckIn != null && dataCheckOut != null) {
            long dias = ChronoUnit.DAYS.between(dataCheckIn, dataCheckOut);
            if (dias < 1) dias = 1; // Mínimo 1 diária
            // Preço por hora * 24 horas * dias
            this.valorTotal = quarto.getPrecoPorHora()
                    .multiply(BigDecimal.valueOf(24))
                    .multiply(BigDecimal.valueOf(dias));
        }
    }

    public void confirmar() {
        this.status = StatusReserva.CONFIRMADA;
        this.quarto.ocupar();
    }

    public void cancelar() {
        this.status = StatusReserva.CANCELADA;
        // Lógica de liberar quarto pode depender se já estava ocupado ou apenas reservado
    }
}
