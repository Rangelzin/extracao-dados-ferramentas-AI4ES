# KPIs e Critérios de Qualidade

Este documento estabelece as métricas de sucesso e os padrões de qualidade exigidos para o projeto.

## 1. Qualidade de Código (Static & Unit)

| Métrica | Meta | Ferramenta | Ação em caso de Desvio |
|---|---|---|---|
| **Cobertura de Testes** | > 80% (Statements/Branches) | Jest + Istanbul | Bloquear Merge no PR. |
| **Duplicação de Código** | < 3% | SonarQube / jscpd | Refatorar trechos duplicados. |
| **Complexidade Ciclomática** | < 10 por função | ESLint / Sonar | Simplificar lógica / Quebrar função. |
| **Linting Errors** | 0 (Zero) | ESLint (Strict) | Corrigir estilo antes do commit. |

## 2. Performance (Runtime)

| KPI | Meta | Contexto | Monitoramento |
|---|---|---|---|
| **Latência de API (p95)** | < 500ms | Endpoints críticos (Reservar listagem). | Prometheus + Grafana. |
| **Web Vitals (LCP)** | < 2.5s | Carregamento inicial do Frontend. | Lighthouse / Google Pagespeed. |
| **Taxa de Erros HTTP** | < 1% | Falhas do servidor (5xx). | Logs / Alertas de Erro. |

## 3. Eficiência do Processo (Agile)

| KPI | Definição | Meta |
|---|---|---|
| **Velocity Stability** | Variação de Story Points entregues por Sprint. | +/- 10% (Previsibilidade). |
| **Lead Time** | Tempo entre criação da tarefa e deploy em produção. | < 5 dias úteis. |
| **Bug Rate** | Número de bugs encontrados em QA/Prod por Sprint. | < 0.5 bugs por Story Point. |

## 4. Definition of Done (DoD)

Uma tarefa só é considerada **"Pronta"** quando:
1.  [ ] Código implementado e commitado no repositório.
2.  [ ] Testes Unitários criados e passando (Green).
3.  [ ] Code Review aprovado por pelo menos 1 desenvolvedor.
4.  [ ] Não introduz novos "Code Smells" ou bugs de lint.
5.  [ ] Funcionalidade validada em ambiente local/staging.
