package com.hotel.repository;

import com.hotel.model.Quarto;
import org.springframework.stereotype.Repository;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class QuartoRepository implements IQuartoRepository {
    private final Map<String, Quarto> quartos = new ConcurrentHashMap<>();

    public Quarto save(Quarto quarto) {
        quartos.put(quarto.getNumero(), quarto);
        return quarto;
    }

    public Optional<Quarto> findByNumero(String numero) {
        return Optional.ofNullable(quartos.get(numero));
    }

    public List<Quarto> findAll() {
        return new ArrayList<>(quartos.values());
    }

    public void deleteByNumero(String numero) {
        quartos.remove(numero);
    }
}
