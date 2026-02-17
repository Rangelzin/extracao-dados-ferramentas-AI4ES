package com.hotel.model;

import com.hotel.enums.TipoQuarto;
import com.hotel.enums.StatusDisponibilidade;
import com.hotel.enums.TipoCama;
import java.util.List;

/**
 * Entidade que representa um Quarto do hotel.
 */
public class Quarto {
    private String numero;
    private int capacidade;
    private TipoQuarto tipo;
    private double precoDiaria;
    private boolean temFrigobar;
    private boolean temCafeIncluso;
    private boolean temArCondicionado;
    private boolean temTV;
    private List<TipoCama> tiposCama;
    private StatusDisponibilidade disponibilidade;

    public Quarto() {}

    public Quarto(String numero, int capacidade, TipoQuarto tipo, double precoDiaria) {
        this.numero = numero;
        this.capacidade = capacidade;
        this.tipo = tipo;
        this.precoDiaria = precoDiaria;
        this.disponibilidade = StatusDisponibilidade.LIVRE;
    }

    // Getters e Setters
    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }

    public int getCapacidade() { return capacidade; }
    public void setCapacidade(int capacidade) { this.capacidade = capacidade; }

    public TipoQuarto getTipo() { return tipo; }
    public void setTipo(TipoQuarto tipo) { this.tipo = tipo; }

    public double getPrecoDiaria() { return precoDiaria; }
    public void setPrecoDiaria(double precoDiaria) { this.precoDiaria = precoDiaria; }

    public boolean isTemFrigobar() { return temFrigobar; }
    public void setTemFrigobar(boolean temFrigobar) { this.temFrigobar = temFrigobar; }

    public boolean isTemCafeIncluso() { return temCafeIncluso; }
    public void setTemCafeIncluso(boolean temCafeIncluso) { this.temCafeIncluso = temCafeIncluso; }

    public boolean isTemArCondicionado() { return temArCondicionado; }
    public void setTemArCondicionado(boolean temArCondicionado) { this.temArCondicionado = temArCondicionado; }

    public boolean isTemTV() { return temTV; }
    public void setTemTV(boolean temTV) { this.temTV = temTV; }

    public List<TipoCama> getTiposCama() { return tiposCama; }
    public void setTiposCama(List<TipoCama> tiposCama) { this.tiposCama = tiposCama; }

    public StatusDisponibilidade getDisponibilidade() { return disponibilidade; }
    public void setDisponibilidade(StatusDisponibilidade disponibilidade) { this.disponibilidade = disponibilidade; }
}
