# Gestão de Riscos e Planos de Mitigação

Este documento detalha os riscos técnicos e gerenciais identificados para o projeto de Gestão Hoteleira, com suas respectivas estratégias de resposta.

## 1. Riscos Técnicos

| Risco | Impacto | Plano de Mitigação |
| :--- | :---: | :--- |
| **Persistência Volátil**: Perda de dados devido ao uso de repositórios em memória. | Alto | Priorizar na Sprint 2 a migração para um banco de dados relacional (ex: SQLite ou PostgreSQL) usando Docker. |
| **Concorrência em Reservas**: Dois hóspedes reservando o mesmo quarto simultaneamente. | Crítico | Implementar validação de estado atômica no backend e utilizar transações de banco de dados para garantir integridade. |
| **Incompatibilidade de Versões**: Quebra de build por atualizações de pacotes (ex: Tailwind ou React Scripts). | Médio | Fixar versões exatas no `package.json` (removendo o prefixo `^`) e realizar builds de validação frequentes. |
| **Segurança de Dados**: Vazamento de CPFs ou e-mails de hóspedes. | Crítico | Implementar sanitização de inputs, validação de tipos rigorosa e seguir as diretrizes da LGPD para armazenamento. |

## 2. Riscos Gerenciais

| Risco | Impacto | Plano de Mitigação |
| :--- | :---: | :--- |
| **Aumento de Escopo (Scope Creep)**: Solicitação de novas funcionalidades não planejadas inicialmente. | Médio | Utilizar a matriz MoSCoW definida na Etapa 1 como guia rígido e postergar itens "Should have" se o cronograma atrasar. |
| **Subestimação de Esforço**: Complexidade do fluxo de reserva ser maior que os 8 SP estimados. | Alto | Realizar uma "Spike" (pesquisa técnica) de 4 horas antes do início da Sprint 2 para validar a viabilidade da lógica. |
| **Dívida Técnica Acumulada**: Priorizar velocidade de entrega em detrimento da refatoração. | Baixo | Manter o compromisso de Code Review e execução obrigatória de testes antes de considerar uma funcionalidade como "Done". |
| **Indisponibilidade de Infraestrutura**: Falhas no ambiente de deploy impedindo o uso do sistema. | Médio | Seguir rigorosamente o Runbook criado na Etapa 5 e garantir que o Docker Compose funcione perfeitamente localmente. |
