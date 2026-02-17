package com.hotel.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cama {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Enumerated(EnumType.STRING)
    private TipoCama tipo;

    // Construtor auxiliar sem ID para facilitar criação
    public Cama(TipoCama tipo) {
        this.tipo = tipo;
    }
}
