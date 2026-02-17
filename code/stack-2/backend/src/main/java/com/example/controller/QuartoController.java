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

    public QuartoController(QuartoService quartoService) {
        this.quartoService = quartoService;
    }

    @PostMapping
    public ResponseEntity<Quarto> cadastrarQuarto(@RequestBody Quarto quarto) {
        Quarto novoQuarto = quartoService.cadastrarQuarto(quarto);
        return new ResponseEntity<>(novoQuarto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quarto> editarQuarto(@PathVariable Long id, @RequestBody Quarto quartoAtualizado) {
        return quartoService.editarQuarto(id, quartoAtualizado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Quarto>> listarQuartos() {
        return ResponseEntity.ok(quartoService.listarQuartos());
    }
}