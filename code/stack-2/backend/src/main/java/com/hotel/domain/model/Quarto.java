package com.hotel.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Quarto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true)
    private Integer numero;

    private Integer capacidade;

    @Enumerated(EnumType.STRING)
    private TipoCama tipo; // Pode ser redundante se tiver lista de camas, mas mantendo compatibilidade com DTO simplificado

    @Column(nullable = false)
    private BigDecimal precoPorHora;

    @Enumerated(EnumType.STRING)
    private StatusQuarto status;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "quarto_id") // Unidirectional OneToMany is simpler for this case
    private List<Cama> camas = new ArrayList<>();

    // Business Logic Methods
    public void ocupar() {
        if (this.status != StatusQuarto.LIVRE) {
            throw new IllegalStateException("Quarto não está livre para ser ocupado.");
        }
        this.status = StatusQuarto.OCUPADO;
    }

    public void liberar() {
        this.status = StatusQuarto.LIMPEZA; // Workflow: Ocupado -> Limpeza -> Livre
    }

    // Getter for price to keep compatibility if needed or just standard getter
    public BigDecimal getPrecoPorHora() {
        return precoPorHora;
    }
}
