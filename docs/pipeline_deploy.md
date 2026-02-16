# Etapa 5 – Pipeline de Deploy

## 1. Objetivo
Automatizar o processo de build, testes e deploy do sistema, garantindo entregas rápidas, seguras e reprodutíveis.

## 2. Estratégia Proposta

### 2.1 Containerização com Docker
- **Backend e Frontend** serão empacotados em containers Docker distintos.
- Cada container terá seu próprio Dockerfile, garantindo ambientes isolados e reprodutíveis.
- Utilização de Docker Compose para orquestrar os serviços (backend, frontend e banco de dados, se necessário).

### 2.2 Integração Contínua (CI)
- Utilização de uma plataforma de CI (ex: GitHub Actions, GitLab CI, Jenkins).
- Pipeline automatizado para:
  1. Instalar dependências
  2. Executar testes unitários e de integração
  3. Build das imagens Docker
  4. Publicação das imagens em um registry (ex: Docker Hub)

### 2.3 Deploy Contínuo (CD)
- Após a publicação das imagens, o deploy pode ser feito em ambiente de produção (ex: VPS, AWS, Azure, GCP ou serviços de container como Heroku, Render, Railway).
- O pipeline pode incluir etapas de:
  - Pull das imagens mais recentes
  - Restart dos containers
  - Execução de migrações de banco de dados, se necessário

## 3. Exemplo de Pipeline (GitHub Actions)
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd code/backend && npm install
          cd ../frontend && npm install
      - name: Run tests
        run: |
          cd code/backend && npm test
      - name: Build Docker images
        run: |
          docker build -t user/backend:latest ./code/backend
          docker build -t user/frontend:latest ./code/frontend
      - name: Push Docker images
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push user/backend:latest
          docker push user/frontend:latest
      # Etapas de deploy podem ser adicionadas conforme o ambiente
```

## 4. Benefícios
- **Automação**: Reduz erros manuais e acelera entregas.
- **Rastreabilidade**: Cada build/teste/deploy é registrado.
- **Escalabilidade**: Fácil replicação do ambiente em diferentes servidores.

---

Essa estratégia garante um ciclo de entrega moderno, seguro e eficiente para o sistema.