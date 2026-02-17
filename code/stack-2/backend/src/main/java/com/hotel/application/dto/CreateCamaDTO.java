package com.hotel.application.dto;

import com.hotel.domain.model.TipoCama;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CreateCamaDTO {
    @NotNull
    private TipoCama tipo;
    @Positive
    private Integer quantidade;
}
