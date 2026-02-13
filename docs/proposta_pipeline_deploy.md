# Proposta de Pipeline de Deploy (CI/CD)

Esta proposta descreve a estratégia de integração e entrega contínua (CI/CD) para o sistema de gestão hoteleira, utilizando Docker para conteinerização e automação de processos.

## 1. Conteinerização (Docker)
O sistema será dividido em dois contêineres principais para garantir isolamento e escalabilidade independente.

### Backend (Node.js/TypeScript)
- **Dockerfile**: Utilizará uma imagem multi-stage (`node:alpine`) para gerar um artefato de produção leve, contendo apenas o código transpilado e as dependências de produção.
- **Ambiente**: Variáveis para porta (3001) e configurações de banco de dados futuro.

### Frontend (React/Nginx)
- **Dockerfile**: Stage 1 para build (`npm run build`) e Stage 2 usando `nginx:stable-alpine` para servir os arquivos estáticos de forma eficiente.

## 2. Orquestração Local (Docker Compose)
Arquivo `docker-compose.yml` na raiz para subir ambos os serviços com um único comando, facilitando o ambiente de desenvolvimento e testes integrados.

## 3. Fluxo de CI/CD (GitHub Actions / GitLab CI)

### Fase de Integração Contínua (CI)
A cada Push ou Pull Request:
1.  **Linting & Typecheck**: Validação de padrões de código no frontend e backend.
2.  **Testes**: Execução dos testes unitários (Quartos) e de integração (Reserva). O pipeline deve falhar se algum teste não passar.
3.  **Build de Imagens**: Criação das imagens Docker para validar que o ambiente de produção está íntegro.

### Fase de Entrega Contínua (CD)
Após merge na branch `main`:
1.  **Push para Registry**: Envio das imagens para o Docker Hub ou GitHub Container Registry (GHCR).
2.  **Deploy**: Atualização do ambiente de staging/produção via Webhook ou comando remoto (ex: SSH + docker-compose pull).

## 4. Monitoramento e Saúde
- Implementação de healthchecks nos contêineres Docker.
- Logs centralizados para monitorar erros em tempo real.
