package com.hotel.dto;

import com.hotel.enums.TipoQuarto;
import com.hotel.enums.TipoCama;
import jakarta.validation.constraints.*;
import java.util.List;

/**
 * Data Transfer Object (DTO) para Quarto.
 * Decisão: Uso de Record (Java 16+) para imutabilidade e concisão.
 * SOLID: Aplica o isolamento da camada de transporte em relação ao domínio.
 */
public record QuartoDTO(
    @NotBlank(message = "Número do quarto é obrigatório")
    String numero,
    
    @Min(value = 1, message = "Capacidade mínima é 1")
    int capacidade,
    
    @NotNull(message = "Tipo do quarto é obrigatório")
    TipoQuarto tipo,
    
    @Positive(message = "Preço deve ser positivo")
    double precoDiaria,
    
    boolean temFrigobar,
    boolean temCafeIncluso,
    boolean temArCondicionado,
    boolean temTV,
    
    @NotEmpty(message = "Deve haver pelo menos uma cama")
    List<TipoCama> tiposCama
) {}
