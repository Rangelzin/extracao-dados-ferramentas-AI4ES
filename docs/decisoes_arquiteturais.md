# Decisões Arquiteturais Críticas (ADR Simplificado)

Este documento registra as principais decisões de arquitetura e design tomadas para o Sistema de Reserva de Hotel, justificando as escolhas e analisando alternativas.

## ADR-001: Estilo de Arquitetura Monolito Modular
*   **Decisão**: O sistema será construído como um Monolito Modular.
*   **Justificativa**: O sistema atende a um único hotel, com baixo volume de tráfego esperado. Microserviços adicionariam complexidade desnecessária de deploy e comunicação. O formato modular garante a organização do código e facilita futura extração se o negócio expandir.
*   **Alternativas Rejeitadas**: Microserviços (Overhead operacional alto), Monolito "Big Ball of Mud" (Dificuldade de manutenção).

## ADR-002: Backend em Node.js com TypeScript
*   **Decisão**: Utilizar Node.js como runtime e TypeScript como linguagem.
*   **Justificativa**: Stack unificada com o Frontend, alta performance I/O bound e tipagem estática que reduz bugs. Ideal para equipes Fullstack JS.
*   **Alternativas Rejeitadas**: Java/Spring (Maior verbosidade), Python/Django (Menor performance em concorrência alta comparado ao Node).

## ADR-003: Frontend SPA com React
*   **Decisão**: O frontend será uma SPA desenvolvida em **React**.
*   **Justificativa**: Biblioteca performática, baseada em componentes, com vasta comunidade e ecossistema (React Router, TanStack Query). Facilita a criação de interfaces ricas e interativas.
*   **Alternativas Rejeitadas**: Vue/Angular (Preferência da equipe por React), Server-Side Rendering tradicional (Acoplamento indesejado).

## ADR-004: Banco de Dados Relacional (PostgreSQL)
*   **Decisão**: Utilizar **PostgreSQL**.
*   **Justificativa**: Banco robusto, open-source, com suporte avançado a JSON (se necessário híbrido) e garantias ACID fortes.
*   **Alternativas Rejeitadas**: MySQL (Postgres oferece recursos mais avançados), MongoDB (Falta de relacionamentos fortes nativos).

## ADR-005: Autenticação via JWT (Stateless)
*   **Decisão**: Utilizar JSON Web Tokens (JWT) para autenticação.
*   **Justificativa**: Permite que o backend seja stateless, facilitando o scale-out horizontal.
*   **Alternativas Rejeitadas**: Sessão Server-side (Dificulta escalabilidade).

## ADR-006: Comunicação Síncrona entre Módulos
*   **Decisão**: A comunicação entre módulos do backend será síncrona (chamada de função).
*   **Justificativa**: Simplicidade e performance máxima (in-memory).
*   **Alternativas Rejeitadas**: Mensageria/Broker (Complexidade desnecessária para monolito).

## ADR-007: Interface Web com Biblioteca de Componentes
*   **Decisão**: Utilizar biblioteca de componentes (ex: Material UI ou Tailwind UI).
*   **Justificativa**: Acelera o desenvolvimento, garante consistência visual e acessibilidade.
*   **Alternativas Rejeitadas**: CSS Puro (Maior esforço de manutenção).
