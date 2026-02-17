package com.hotel.application.service;

import com.hotel.application.dto.CreateQuartoDTO;
import com.hotel.application.dto.QuartoDTO;
import com.hotel.application.mapper.QuartoMapper;
import com.hotel.domain.model.Quarto;
import com.hotel.domain.repository.QuartoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuartoService {

    private final QuartoRepository quartoRepository;
    private final QuartoMapper quartoMapper;

    @Transactional
    public QuartoDTO criarQuarto(CreateQuartoDTO input) {
        if (quartoRepository.findByNumero(input.getNumero()).isPresent()) {
            throw new IllegalArgumentException("Quarto com número " + input.getNumero() + " já existe.");
        }

        Quarto novoQuarto = quartoMapper.toEntity(input);
        quartoRepository.save(novoQuarto);
        return quartoMapper.toDTO(novoQuarto);
    }

    @Transactional
    public QuartoDTO editarQuarto(UUID id, CreateQuartoDTO input) {
        Quarto quarto = quartoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Quarto não encontrado com ID: " + id));

        quartoMapper.updateEntityFromDTO(quarto, input);
        quartoRepository.save(quarto);
        
        return quartoMapper.toDTO(quarto);
    }

    public List<QuartoDTO> listarQuartos() {
        return quartoRepository.findAll().stream()
                .map(quartoMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    public QuartoDTO buscarPorId(UUID id) {
         Quarto quarto = quartoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Quarto não encontrado com ID: " + id));
         return quartoMapper.toDTO(quarto);
    }
}
