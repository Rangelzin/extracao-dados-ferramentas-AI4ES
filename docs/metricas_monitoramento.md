# Definição de Métricas e Logs para Monitoramento

Para garantir a confiabilidade e o desempenho do sistema de gestão hoteleira, estabelecemos as seguintes métricas e estratégias de logging baseadas nos princípios de SRE (Site Reliability Engineering).

## 1. Métricas de Desempenho (The Four Golden Signals)

### Disponibilidade (Availability)
- **O que medir**: Percentual de solicitações bem-sucedidas (HTTP 2xx/3xx) vs falhas (HTTP 5xx).
- **Meta**: 99.9% de disponibilidade.
- **Alertas**: Disparar alerta se a taxa de erro 5xx exceder 1% em um intervalo de 5 minutos.

### Latência (Latency)
- **O que medir**: Tempo que o backend leva para processar solicitações (especialmente listagem de quartos e criação de reservas).
- **Segmentação**: p50 (média), p95 (casos críticos) e p99.
- **Meta**: p95 < 200ms para endpoints de leitura; p95 < 500ms para escrita.

### Tráfego (Traffic)
- **O que medir**: Número de requisições por segundo (RPS) no servidor Express.
- **Objetivo**: Identificar picos de uso e necessidade de escalonamento dos contêineres.

### Saturação (Saturation)
- **O que medir**: Uso de CPU e Memória RAM dos contêineres Docker (Backend e Frontend).
- **Alerta**: Notificar se o uso de memória atingir 80% da cota do contêiner.

## 2. Estratégia de Logging

### Logs de Aplicação (Backend)
- **Formato**: JSON (facilitando a indexação em ferramentas como ELK Stack ou Datadog).
- **Níveis de Log**:
    - `INFO`: Início de processos (ex: "Reserva #123 iniciada").
    - `WARN`: Problemas não fatais (ex: "Tentativa de reserva em quarto já ocupado").
    - `ERROR`: Falhas críticas (ex: "Erro ao conectar ao repositório", "Exception não tratada").
- **Contexto**: Incluir `requestId` em todos os logs de uma mesma transação para rastreabilidade.

### Logs de Acesso (Frontend/Nginx)
- Monitorar logs do Nginx para identificar erros de carregamento de assets e latência na entrega do bundle React.

## 3. Ferramentas Recomendadas
- **Prometheus & Grafana**: Para coleta e visualização de métricas.
- **Winston/Pino (Node.js)**: Bibliotecas de logging para garantir alta performance no backend.
- **Health Checks**: Endpoint `/health` no backend para monitoramento de vivacidade (Liveness) e prontidão (Readiness).
