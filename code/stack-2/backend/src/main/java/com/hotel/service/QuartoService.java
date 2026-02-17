package com.hotel.service;

import com.hotel.dto.QuartoDTO;
import com.hotel.model.Quarto;
import com.hotel.repository.IQuartoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Serviço responsável pela lógica de negócio da Gestão de Quartos.
 * Aplica o Princípio da Responsabilidade Única (SRP) ao focar apenas em regras de negócio,
 * delegando a persistência para a abstração do repositório.
 */
@Service
public class QuartoService {
    
    // Injeção via Interface (DIP): O serviço não depende de uma implementação concreta.
    private final IQuartoRepository repository;

    public QuartoService(IQuartoRepository repository) {
        this.repository = repository;
    }

    /**
     * Cadastra um novo quarto validando a unicidade do número.
     * @param dto Dados de entrada validados pela camada de Controller.
     */
    public Quarto cadastrar(QuartoDTO dto) {
        repository.findByNumero(dto.numero())
            .ifPresent(q -> {
                throw new RuntimeException("Regra de Negócio: Quarto " + dto.numero() + " já existe.");
            });

        Quarto quarto = mapToEntity(dto, new Quarto());
        return repository.save(quarto);
    }

    /**
     * Edita informações de um quarto existente.
     * @param numero Identificador único do quarto.
     * @param dto Novos dados.
     */
    public Quarto editar(String numero, QuartoDTO dto) {
        Quarto quarto = repository.findByNumero(numero)
            .orElseThrow(() -> new RuntimeException("Erro: Quarto não encontrado para edição."));
        
        mapToEntity(dto, quarto);
        return repository.save(quarto);
    }

    /**
     * Retorna todos os quartos cadastrados.
     */
    public List<Quarto> listarTodos() {
        return repository.findAll();
    }

    /**
     * Método auxiliar de mapeamento (Data Mapper Pattern simplificado).
     * Isola a lógica de transformação de DTO para Entidade, mantendo o código limpo.
     */
    private Quarto mapToEntity(QuartoDTO dto, Quarto entity) {
        entity.setNumero(dto.numero());
        entity.setCapacidade(dto.capacidade());
        entity.setTipo(dto.tipo());
        entity.setPrecoDiaria(dto.precoDiaria());
        entity.setTemFrigobar(dto.temFrigobar());
        entity.setTemCafeIncluso(dto.temCafeIncluso());
        entity.setTemArCondicionado(dto.temArCondicionado());
        entity.setTemTV(dto.temTV());
        entity.setTiposCama(dto.tiposCama());
        return entity;
    }
}
