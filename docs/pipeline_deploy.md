# Proposta de Pipeline de Deploy - Sistema de Reserva de Hotel

Esta proposta define a estratégia de Containerização e Integração Contínua/Entrega Contínua (CI/CD) para o sistema.

## 1. Containerização (Docker)

A utilização de Docker garante que o ambiente de execução seja consistente entre desenvolvimento, testes e produção.

### 1.1 Backend (Node.js)
*   **Imagem Base**: `node:20-alpine` (leve e segura).
*   **Estágios**:
    *   *Build*: Instalação de dependências e compilação TypeScript (`npm run build`).
    *   *Runtime*: Copia apenas os arquivos compilados (`dist/`) e dependências de produção (`node_modules/`).
*   **Porta**: 3000.

### 1.2 Frontend (React + Vite)
*   **Imagem Base**: `node:20-alpine` (build) -> `nginx:alpine` (runtime).
*   **Estágios**:
    *   *Build*: Gera os arquivos estáticos otimizados (`npm run build`).
    *   *Runtime*: Nginx serve os arquivos estáticos da pasta `dist/` e gerencia o roteamento (SPA fallback).
*   **Porta**: 80 (Interna do container) -> 8080 (Externa).

### 1.3 Orquestração (Docker Compose)
Arquivo `docker-compose.yml` para subir toda a stack localmente ou em servidor simples.
*   **Serviços**:
    *   `backend`: API REST.
    *   `frontend`: Servidor Web Nginx.
    *   *(Futuro)* `database`: PostgreSQL/MySQL (atualmente em memória).

---

## 2. Pipeline de CI/CD (GitHub Actions)

O pipeline será automatizado via GitHub Actions, gatilhado por *Push* ou *Pull Request* na branch `main` (ou `extracao-antigravity`).

### Workflow: `ci-cd.yaml`

#### Job 1: Integração Contínua (CI)
Foca na qualidade do código.
1.  **Checkout** do código.
2.  **Setup Node.js** (Cache npm).
3.  **Install Dependencies** (Backend & Frontend).
4.  **Linting**: Verificar estilo de código.
5.  **Tests**: Executar `npm test` no backend (Unitários e Integração).

#### Job 2: Build & Publish (CD - Entrega)
Executado apenas se o Job CI passar.
1.  **Login no Docker Hub** (ou GHCR).
2.  **Build** das imagens Docker (`backend:latest`, `frontend:latest`).
3.  **Push** das imagens para o registro.

#### Job 3: Deploy (Opcional/Simulado)
1.  Conectar via SSH no servidor de produção.
2.  Executar `docker-compose pull && docker-compose up -d`.

---

## 3. Benefícios
*   **Reprodutibilidade**: "Funciona na minha máquina" deixa de ser um problema.
*   **Segurança**: Imagens Alpine reduzem a superfície de ataque.
*   **Automação**: Testes rodam a cada commit, impedindo que código quebrado chegue à produção.
