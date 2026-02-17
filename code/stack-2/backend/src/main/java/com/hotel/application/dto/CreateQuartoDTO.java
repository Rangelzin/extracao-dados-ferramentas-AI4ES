package com.hotel.application.dto;

import com.hotel.domain.model.TipoCama;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CreateQuartoDTO {
    @NotNull(message = "Número do quarto é obrigatório")
    private Integer numero;

    @Positive(message = "Capacidade deve ser positiva")
    private Integer capacidade;

    private TipoCama tipo; // Opcional, ou derivado das camas

    @NotNull(message = "Preço por hora é obrigatório")
    @Positive
    private BigDecimal precoPorHora;

    private List<CreateCamaDTO> camas;
}


