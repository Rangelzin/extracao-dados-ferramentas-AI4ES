package com.hotel.domain.repository;

import com.hotel.domain.model.Quarto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface QuartoRepository extends JpaRepository<Quarto, UUID> {
    Optional<Quarto> findByNumero(Integer numero);
}
