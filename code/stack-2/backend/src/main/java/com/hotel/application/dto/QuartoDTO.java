package com.hotel.application.dto;

import com.hotel.domain.model.StatusQuarto;
import com.hotel.domain.model.TipoCama;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class QuartoDTO {
    private UUID id;
    private Integer numero;
    private Integer capacidade;
    private TipoCama tipo;
    private BigDecimal precoPorHora;
    private StatusQuarto status;
    private List<CamaDTO> camas;
}


