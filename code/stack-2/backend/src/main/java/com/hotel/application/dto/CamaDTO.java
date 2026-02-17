package com.hotel.application.dto;

import com.hotel.domain.model.TipoCama;
import lombok.Data;

import java.util.UUID;

@Data
public class CamaDTO {
    private UUID id;
    private TipoCama tipo;
}
