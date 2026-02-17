package com.hotel.application.mapper;

import com.hotel.application.dto.CamaDTO;
import com.hotel.application.dto.CreateQuartoDTO;
import com.hotel.application.dto.QuartoDTO;
import com.hotel.domain.model.Cama;
import com.hotel.domain.model.Quarto;
import com.hotel.domain.model.StatusQuarto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
/**
 * Mapper responsible for converting between Domain Entities and Data Transfer
 * Objects (DTOs).
 * <p>
 * **Design Decision**:
 * - Decouples the API contract (DTO) from the internal Domain Model.
 * - Allows the Domain Model to evolve without breaking external clients
 * (OCP/Stability).
 * - Implemented manually here for explicit transformation logic, though tools
 * like MapStruct could be used.
 * </p>
 */
public class QuartoMapper {

    public Quarto toEntity(CreateQuartoDTO dto) {
        Quarto quarto = new Quarto();
        quarto.setNumero(dto.getNumero());
        quarto.setCapacidade(dto.getCapacidade());
        quarto.setTipo(dto.getTipo());
        quarto.setPrecoPorHora(dto.getPrecoPorHora()); // Updated field
        quarto.setStatus(StatusQuarto.LIVRE);
        
        // Logic to generate beds from DTO (similar to Stack 1 logic)
        if (dto.getCamas() != null) {
            List<Cama> camas = new ArrayList<>();
            dto.getCamas().forEach(c -> {
                for (int i = 0; i < c.getQuantidade(); i++) {
                    camas.add(new Cama(c.getTipo()));
                }
            });
            quarto.setCamas(camas);
        }
        
        return quarto;
    }

    public QuartoDTO toDTO(Quarto entity) {
        QuartoDTO dto = new QuartoDTO();
        dto.setId(entity.getId());
        dto.setNumero(entity.getNumero());
        dto.setCapacidade(entity.getCapacidade());
        dto.setTipo(entity.getTipo());
        dto.setPrecoPorHora(entity.getPrecoPorHora()); // Updated field
        dto.setStatus(entity.getStatus());
        
        if (entity.getCamas() != null) {
            List<CamaDTO> camasDTO = entity.getCamas().stream().map(c -> {
                CamaDTO cDto = new CamaDTO();
                cDto.setId(c.getId());
                cDto.setTipo(c.getTipo());
                return cDto;
            }).collect(Collectors.toList());
            dto.setCamas(camasDTO);
        }
        
        return dto;
    }
    
    public void updateEntityFromDTO(Quarto entity, CreateQuartoDTO dto) {
         // Reusing CreateQuartoDTO for simplicity as Updatable fields are mostly the same, 
         // although a separate UpdateQuartoDTO is cleaner. For now:
         if (dto.getNumero() != null) entity.setNumero(dto.getNumero());
         if (dto.getCapacidade() != null) entity.setCapacidade(dto.getCapacidade());
         if (dto.getTipo() != null) entity.setTipo(dto.getTipo());
         if (dto.getPrecoPorHora() != null) entity.setPrecoPorHora(dto.getPrecoPorHora());
         
         // Update beds logic is complex (full replace or diff?). 
         // For MPV/Stack 2, fully replacing if provided is acceptable.
         if (dto.getCamas() != null) {
            entity.getCamas().clear();
            dto.getCamas().forEach(c -> {
                for (int i = 0; i < c.getQuantidade(); i++) {
                    entity.getCamas().add(new Cama(c.getTipo()));
                }
            });
         }
    }
}
