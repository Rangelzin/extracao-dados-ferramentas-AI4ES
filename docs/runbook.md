# Runbook de Resposta a Incidentes - Sistema de Reserva de Hotel

Este documento descreve o fluxo padrão para tratamento de falhas em produção.

## 1. Classificação de Severidade

| Nível | Descrição | Exemplo | SLA de Resposta |
|---|---|---|---|
| **SEV-1 (Crítico)** | Sistema indisponível para todos os usuários ou perda de dados. | API retornando 500 em tudo; DB fora do ar. | < 15 min |
| **SEV-2 (Alto)** | Funcionalidade principal degradada ou lenta. | Reservas falhando intermitentemente; Latência > 2s. | < 1 hora |
| **SEV-3 (Médio)** | Funcionalidade secundária afetada. | Relatórios não gerados; Erros visuais no frontend. | < 4 horas |
| **SEV-4 (Baixo)** | Bugs menores ou dúvidas. | Erro de ortografia; Dúvida de uso. | Próximo deploy |

## 2. Fluxo de Resposta (Incidente SEV-1/SEV-2)

### Passo 1: Detecção e Reconhecimento
*   **Alerta**: O sistema de monitoramento (Prometheus/PagerDuty) dispara um alerta.
*   **Ação**: O Engenheiro de Plantão (On-call) reconhece o alerta (ACK).
*   **Comunicação**: Criar canal de incidente (Slack `#incidente-<id>`) e notificar stakeholders.

### Passo 2: Triagem e Mitigação
*   **Objetivo**: Restaurar o serviço, não necessariamente consertar a causa raiz.
*   **Ações Comuns**:
    *   *Rollback*: Se começou após um deploy recente, reverter para a versão anterior.
    *   *Restart*: Reiniciar serviços travados.
    *   *Scale Out*: Aumentar réplicas se for sobrecarga.
    *   *Circuit Breaker*: Desativar funcionalidade problemática (ex: integração externa).

### Passo 3: Diagnóstico (Root Cause Analysis)
*   Analisar logs (filtrar por `ERROR` e `timestamp` do incidente).
*   Verificar métricas de infraestrutura (CPU, Memória, Disco).
*   Reproduzir erro em ambiente de staging, se possível.

### Passo 4: Resolução Definitiva
*   Desenvolver correção (Hotfix).
*   Testar correção (Testes de Regressão).
*   Deploy emergencial.

### Passo 5: Post-Mortem
*   Documentar o incidente em até 24h após a resolução.
*   **Perguntas Chave**:
    *   O que causou?
    *   Por que demorou para detectar?
    *   Como evitar que ocorra novamente?
*   Criar tarefas no backlog para melhorias identificadas.

## 3. Comandos Úteis (Cheat Sheet)

### Docker
```bash
# Ver logs em tempo real
docker logs -f --tail 100 <container_id>

# Reiniciar serviço
docker restart <container_id>

# Ver consumo de recursos
docker stats
```

### Banco de Dados
```sql
-- Verificar conexões ativas
SHOW PROCESSLIST;
```
