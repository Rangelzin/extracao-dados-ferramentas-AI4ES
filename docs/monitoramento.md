# Estratégia de Monitoramento e Observabilidade

Este documento define as métricas essenciais e o padrão de logs para garantir a operabilidade e rápida resolução de incidentes no Sistema de Reserva de Hotel.

## 1. Métricas Chave (Golden Signals)

Adotaremos a metodologia dos "Four Golden Signals" do Google SRE para monitoramento de saúde do sistema.

| Métrica | Definição | Como Medir | Alerta (Sugestão) |
|---|---|---|---|
| **Disponibilidade** | Porcentagem de tempo que o serviço está respondendo com sucesso. | `(Req Sucesso / Total Req) * 100` | Alerta se < 99.9% em 5min. |
| **Latência** | Tempo que o servidor leva para processar uma requisição. Medido em percentis. | **p50**: Mediana (experiência comum). <br> **p95**: Cauda (experiência lenta). | Alerta se p95 > 500ms. |
| **Taxa de Erros** | Taxa de requisições que falham (HTTP 5xx retornados explicitamente ou falhas de conexão). | Contagem de HTTP 500, 502, 503 por segundo. | Alerta se > 1% das reqs. |
| **Saturação** | O quão "cheio" está o serviço. Foco em recursos limitantes. | CPU Usage, Memory Usage, Pool de Conexões DB. | Alerta se CPU > 80%. |

## 2. Estratégia de Logs

Os logs devem ser estruturados (JSON) para facilitar a ingestão e consulta por ferramentas automatizadas.

### 2.1 Estrutura do Log (JSON)
```json
{
  "timestamp": "2023-10-27T10:00:00Z",
  "level": "INFO", 
  "service": "backend-hotel",
  "correlationId": "uuid-v4",
  "message": "Reserva criada com sucesso",
  "context": {
    "reservaId": "...",
    "quartoId": "...",
    "userId": "..."
  }
}
```

### 2.2 Níveis de Log
*   **ERROR**: Falha que impede a operação (ex: Falha ao conectar no DB, NullPointerException). Requer atenção imediata.
*   **WARN**: Situação inesperada mas recuperável (ex: Retry de conexão, Input inválido frequente). Pode indicar problema futuro.
*   **INFO**: Eventos de negócio ou ciclo de vida (ex: "Servidor iniciado", "Reserva confirmada"). Útil para auditoria e métricas.
*   **DEBUG**: Detalhes técnicos para desenvolvimento (ex: Payload completo da request). Desativado em produção por padrão.

### 2.3 Rastreabilidade (Distributed Tracing)
*   **Correlation ID**: Cada requisição deve receber um ID único no início do processamento (no Gateway ou Load Balancer) que é repassado para todos os serviços internos e logs.

## 3. Ferramentas Propostas

*   **Coleta de Métricas**: Prometheus (scrape endpoint `/metrics`).
*   **Visualização**: Grafana (Dashboards para Latência, Erros e Recursos).
*   **Logs**: Winston (Node.js) -> Console (Stdout) -> Coletor (Fluentd/Logstash) -> Elasticsearch/Loki.
