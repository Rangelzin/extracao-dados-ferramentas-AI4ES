package com.hotel.controller;

import com.hotel.dto.QuartoDTO;
import com.hotel.model.Quarto;
import com.hotel.service.QuartoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Interface de entrada do sistema para operações de Quartos.
 * Segue o padrão RESTful e utiliza DTOs para evitar exposição direta das entidades de domínio (Encapsulamento).
 */
@RestController
@RequestMapping("/api/quartos")
@CrossOrigin(origins = "*") // Permite integração com o Frontend em diferentes portas
public class QuartoController {
    
    private final QuartoService service;

    public QuartoController(QuartoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Quarto> cadastrar(@RequestBody @Valid QuartoDTO dto) {
        // Retorna 201 Created após sucesso (Boa prática REST)
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(dto));
    }

    @PutMapping("/{numero}")
    public ResponseEntity<Quarto> editar(@PathVariable String numero, @RequestBody @Valid QuartoDTO dto) {
        return ResponseEntity.ok(service.editar(numero, dto));
    }

    @GetMapping
    public ResponseEntity<List<Quarto>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }
}
