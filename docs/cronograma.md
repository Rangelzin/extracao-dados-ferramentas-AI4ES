# Cronograma do Projeto - Sistema de Reserva de Hotel

Este documento define o cronograma de desenvolvimento dividido em Sprints quinzenais (2 semanas).

## Visão Geral
*   **Duração da Sprint**: 10 dias úteis (2 semanas).
*   **Time**: 1 Backend Dev, 1 Frontend Dev (Simulado).

## Sprint 1: Fundação e Core de Quartos
**Objetivo**: Estabelecer a arquitetura base e permitir o cadastro de quartos.
*   Setup do Repositório e Ambiente (Docker, Node, React).
*   Implementação do Backend: Domínio `Quarto`, Service, Repository (In-Memory).
*   Implementação do Frontend: Telas de Listagem e Cadastro de Quartos.
*   Integração Inicial Backend-Frontend.

## Sprint 2: Gestão de Hóspedes e Reservas (MVP)
**Objetivo**: Permitir que um hóspede realize uma reserva simples.
*   Backend: Módulos `Hospede` e `Reserva` (CRUD básico).
*   Lógica de Negócio: Validação de disponibilidade de quarto.
*   Frontend: Telas de Cadastro de Hóspedes e Criação de Reserva.
*   Testes Unitários de `QuartoService` e `ReservaService`.

## Sprint 3: Refinamento e Qualidade
**Objetivo**: Garantir robustez, melhorias de UI/UX e persistência real.
*   Migração de repositório In-Memory para Banco de Dados (PostgreSQL).
*   Refatoração de Código (Clean Code, DRY).
*   Testes de Integração (Fluxo completo).
*   Melhorias visuais no Frontend (Tailwind UI refinado).

## Sprint 4: Operações e Entrega Final
**Objetivo**: Preparar o sistema para produção.
*   Configuração de Docker Compose e Dockerfiles de produção.
*   Pipeline de CI/CD (GitHub Actions).
*   Monitoramento (Logs estruturados, Métricas básicas).
*   Documentação Técnica (Swagger, Runbooks).
