package com.example.service;

import com.example.model.Quarto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuartoService {

    private final List<Quarto> quartos = new ArrayList<>();

    public Quarto cadastrarQuarto(Quarto quarto) {
        quartos.add(quarto);
        return quarto;
    }

    public Optional<Quarto> editarQuarto(Long id, Quarto quartoAtualizado) {
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
        return quartos;
    }
}