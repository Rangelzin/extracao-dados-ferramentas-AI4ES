package com.hotel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Ponto de entrada da aplicação Spring Boot.
 * Decisão: Configuração simplificada via anotação SpringBootApplication para auto-scan de componentes.
 * SOLID: Atua apenas como bootstrap do sistema (SRP).
 */
@SpringBootApplication
public class SistemaReservaApplication {
	public static void main(String[] args) {
		SpringApplication.run(SistemaReservaApplication.class, args);
	}
}
