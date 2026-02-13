# Planejamento de Sprints - Sistema de Gestão Hoteleira

Este cronograma organiza o desenvolvimento das funcionalidades restantes e melhorias contínuas em ciclos de 1 semana (Sprints).

## Sprint 1: Fundação da Gestão de Hóspedes
- **Objetivo**: Implementar o CRUD completo de hóspedes no backend e frontend.
- **Entregáveis**:
    - Serviço e Repositório de Hóspedes (Backend).
    - Tela de listagem e formulário de cadastro de Hóspedes (Frontend).
    - Testes unitários de validação de CPF e dados obrigatórios.

## Sprint 2: Motor de Reservas e Disponibilidade
- **Objetivo**: Implementar a lógica central de reservas vinculando hóspedes e quartos.
- **Entregáveis**:
    - Orquestrador de Reservas (Backend).
    - Interface de reserva vinculada à seleção de quartos (Frontend).
    - Implementação de Regras de Negócio: Impedir reservas em quartos ocupados/manutenção.

## Sprint 3: Dashboard e Gestão Operacional
- **Objetivo**: Visibilidade do status do hotel e finalização de fluxos.
- **Entregáveis**:
    - Dashboard com Chips de disponibilidade (Ocupado, Livre, Limpeza).
    - Funcionalidade de Edição de Reservas.
    - Exportação de relatórios simples de ocupação.

## Sprint 4: Qualidade, Infraestrutura e Finalização
- **Objetivo**: Garantir que o sistema esteja pronto para produção.
- **Entregáveis**:
    - Implementação de Dockerfiles e Docker Compose.
    - Testes de integração de ponta a ponta (E2E).
    - Ajustes finais de UI/UX e paleta de cores.
