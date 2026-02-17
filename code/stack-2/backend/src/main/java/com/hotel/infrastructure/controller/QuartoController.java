package com.hotel.infrastructure.controller;

import com.hotel.application.dto.CreateQuartoDTO;
import com.hotel.application.dto.QuartoDTO;
import com.hotel.application.service.QuartoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/quartos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow frontend access
public class QuartoController {

    private final QuartoService quartoService;

    @PostMapping
    public ResponseEntity<QuartoDTO> criarQuarto(@RequestBody @Valid CreateQuartoDTO input) {
        QuartoDTO novoQuarto = quartoService.criarQuarto(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoQuarto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuartoDTO> editarQuarto(@PathVariable UUID id, @RequestBody @Valid CreateQuartoDTO input) {
        QuartoDTO quartoAtualizado = quartoService.editarQuarto(id, input);
        return ResponseEntity.ok(quartoAtualizado);
    }

    @GetMapping
    public ResponseEntity<List<QuartoDTO>> listarQuartos() {
        List<QuartoDTO> quartos = quartoService.listarQuartos();
        return ResponseEntity.ok(quartos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<QuartoDTO> buscarPorId(@PathVariable UUID id) {
        QuartoDTO quarto = quartoService.buscarPorId(id);
        return ResponseEntity.ok(quarto);
    }
}
