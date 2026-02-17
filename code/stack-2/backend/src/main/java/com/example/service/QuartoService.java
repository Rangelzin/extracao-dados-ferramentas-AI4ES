package com.example.service;

import com.example.model.Quarto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuartoService {

    // Service layer for managing room-related business logic

    private final List<Quarto> quartos = new ArrayList<>();
    // In-memory storage for rooms; can be replaced with a database in the future

    public Quarto cadastrarQuarto(Quarto quarto) {
        // Adds a new room to the list
        quartos.add(quarto);
        return quarto;
    }

    public Optional<Quarto> editarQuarto(Long id, Quarto quartoAtualizado) {
        // Updates the details of an existing room
        for (Quarto quarto : quartos) {
            if (quarto.getId().equals(id)) {
                quarto.setTipo(quartoAtualizado.getTipo());
                quarto.setPreco(quartoAtualizado.getPreco());
                quarto.setDisponibilidade(quartoAtualizado.getDisponibilidade());
                quarto.setCamas(quartoAtualizado.getCamas());
                return Optional.of(quarto);
            }
        }
        return Optional.empty();
    }

    public List<Quarto> listarQuartos() {
        // Retrieves the list of all rooms
        return quartos;
    }
}