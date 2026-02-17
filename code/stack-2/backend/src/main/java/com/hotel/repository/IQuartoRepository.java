package com.hotel.repository;

import com.hotel.model.Quarto;
import java.util.List;
import java.util.Optional;

/**
 * Interface que define o contrato para persistência de Quartos.
 * Segue o Princípio de Inversão de Dependência (DIP), permitindo trocar a 
 * implementação (In-Memory, JPA, NoSQL) sem afetar a camada de serviço.
 */
public interface IQuartoRepository {
    Quarto save(Quarto quarto);
    Optional<Quarto> findByNumero(String numero);
    List<Quarto> findAll();
    void deleteByNumero(String numero);
}
