# Monitoramento: Métricas e Logs

## 1. Objetivo
Garantir a observabilidade do sistema, permitindo identificar rapidamente problemas de disponibilidade, desempenho e erros.

## 2. Métricas a Serem Monitoradas

### 2.1 Disponibilidade
- **Uptime do serviço**: Percentual de tempo em que o backend e frontend estão acessíveis.
- **Status dos endpoints**: Monitoramento de respostas HTTP 200 em endpoints críticos (ex: /health, /login, /reservas).

### 2.2 Latência
- **Tempo de resposta dos endpoints**: Medição do tempo médio e máximo de resposta das principais rotas da API.
- **Tempo de build/deploy**: Monitorar quanto tempo leva cada etapa do pipeline.

### 2.3 Erros
- **Taxa de erros HTTP**: Quantidade e percentual de respostas 4xx e 5xx.
- **Falhas de autenticação/autorização**: Número de tentativas inválidas.
- **Exceções não tratadas**: Logs de stack trace e mensagens de erro.

## 3. Logs a Serem Coletados
- **Acessos**: Registro de cada requisição (endpoint, método, status, tempo de resposta, IP).
- **Erros**: Detalhes de exceções, payloads problemáticos e contexto do erro.
- **Eventos de negócio**: Criação de reservas, cadastro de hóspedes, alterações de disponibilidade.
- **Deploys e builds**: Sucesso/falha, duração e responsável.

## 4. Ferramentas Sugeridas
- **Métricas**: Prometheus, Grafana, New Relic, Datadog.
- **Logs**: ELK Stack (Elasticsearch, Logstash, Kibana), Loki, Papertrail, CloudWatch.
- **Alertas**: Configuração de alertas para quedas de disponibilidade, aumento de latência ou picos de erro.

## 5. Exemplos de Indicadores
- Disponibilidade > 99,9%
- Latência média < 300ms
- Taxa de erro < 1%

---

O monitoramento contínuo dessas métricas e logs permite respostas rápidas a incidentes e melhoria contínua da qualidade do sistema.