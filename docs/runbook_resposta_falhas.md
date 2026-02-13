# Runbook: Procedimento de Resposta a Falhas

Este runbook define os passos necessários para identificar, mitigar e resolver falhas críticas no sistema de gestão hoteleira.

## 1. Triagem e Severidade
Ao detectar uma anomalia (via monitoramento ou reporte de usuário), classifique a severidade:
- **Nível 1 (Crítico)**: Sistema indisponível ou impossibilidade de realizar reservas.
- **Nível 2 (Alto)**: Funcionalidades secundárias inoperantes (ex: listagem de hóspedes lenta).
- **Nível 3 (Baixo)**: Problemas estéticos ou erros em fluxos raros.

## 2. Diagnóstico Rápido
Execute os seguintes comandos no servidor/ambiente:
- **Verificar contêineres**: `docker ps` (verificar se algum serviço reiniciou).
- **Logs de Erro**: `docker logs backend --tail 100` para buscar exceções não tratadas.
- **Conectividade**: Testar o endpoint `/health` via `curl http://localhost:3001/health`.

## 3. Fluxos de Mitigação

### Falha no Backend (Servidor parou)
1.  **Reinício**: Tente `docker-compose restart backend`.
2.  **Rollback**: Se a falha ocorreu após um novo deploy, reverta para a imagem Docker anterior estável no registro.

### Latência Excessiva
1.  **Identificação**: Verifique nos logs de acesso qual endpoint está lento.
2.  **Ação**: Reinicie o serviço ou escale horizontalmente (se em ambiente orquestrado como Kubernetes) para reduzir a carga.

### Erro de "Quarto Não Encontrado" no Frontend
1.  **Verificação**: Confirme se o backend está respondendo corretamente à rota `GET /api/quartos`.
2.  **Sincronização**: Verifique se houve mudança na interface de tipos (`domain-entities.ts`) que não foi replicada entre os projetos.

## 4. Pós-Incidente (Post-Mortem)
Após a resolução:
- Documente a causa raiz (**Root Cause Analysis**).
- Crie um novo teste automatizado (unidade ou integração) que cubra o cenário que causou a falha para evitar regressões.
- Atualize este runbook se um novo procedimento de recuperação for descoberto.
