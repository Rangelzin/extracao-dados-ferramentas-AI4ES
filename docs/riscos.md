# Matriz de Riscos e Plano de Mitigação

Este documento identifica os principais riscos do projeto e define estratégias para minimizá-los.

## 1. Riscos Técnicos

| Risco | Impacto | Probabilidade | Plano de Mitigação |
|---|:---:|:---:|---|
| **Falha em Integrações Externas** <br> (ex: Gateway de Pagamento, API de Email) | Alto | Média | - Implementar Pattern **Circuit Breaker**.<br>- Usar Mocks robustos para testes.<br>- Fila de retry (Dead Letter Queue). |
| **Escalabilidade do Banco de Dados** <br> (Lentidão em querys complexas) | Alto | Baixa (MVP) | - Indexação adequada desde o início.<br>- Cache (Redis) para dados de leitura frequente (ex: lista de quartos). |
| **Vulnerabilidades de Segurança** <br> (SQL Injection, XSS) | Crítico | Baixa | - Usar ORM/Query Builder validado.<br>- Escanear dependências (`npm audit`) no CI/CD.<br>- Sanitização de inputs no Frontend e Backend. |
| **Dívida Técnica Acumulada** | Médio | Média | - Refatoração contínua (Boy Scout Rule).<br>- Code Reviews obrigatórios antes do merge.<br>- Manter cobertura de testes > 80%. |

## 2. Riscos Gerenciais

| Risco | Impacto | Probabilidade | Plano de Mitigação |
|---|:---:|:---:|---|
| **Aumento de Escopo (Scope Creep)** | Alto | Alta | - Congelar requisitos no início da Sprint.<br>- Documentar todas as mudanças solicitadas (+ impacto no prazo).<br>- Priorizar MVP. |
| **Atraso na Entrega** | Alto | Média | - Estimativas com margem de segurança (buffer).<br>- Daily meetings para identificar bloqueios cedo.<br>- Cortar features "nice-to-have" se necessário. |
| **Rotatividade da Equipe (Turnover)** | Crítico | Baixa | - Documentação atualizada (Onboarding).<br>- Pair Programming para disseminar conhecimento.<br>- Código limpo e padronizado. |
| **Falha de Comunicação** | Médio | Média | - Ferramentas de gestão centralizadas (Jira/Trello).<br>- Documentar decisões de arquitetura (ADRs). |
