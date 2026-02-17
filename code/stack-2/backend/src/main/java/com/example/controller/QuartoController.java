package com.example.controller;

import com.example.model.Quarto;
import com.example.service.QuartoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/quartos")
public class QuartoController {

    private final QuartoService quartoService;

    // Dependency Injection ensures adherence to the Dependency Inversion Principle
    // (DIP)
    public QuartoController(QuartoService quartoService) {
        this.quartoService = quartoService;
    }

    // Handles HTTP requests related to room management

    @PostMapping
    public ResponseEntity<Quarto> cadastrarQuarto(@RequestBody Quarto quarto) {
        // Endpoint to create a new room
        Quarto novoQuarto = quartoService.cadastrarQuarto(quarto);
        return new ResponseEntity<>(novoQuarto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quarto> editarQuarto(@PathVariable Long id, @RequestBody Quarto quartoAtualizado) {
        // Endpoint to update an existing room
        return quartoService.editarQuarto(id, quartoAtualizado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Quarto>> listarQuartos() {
        // Endpoint to retrieve all rooms
        return ResponseEntity.ok(quartoService.listarQuartos());
    }
}