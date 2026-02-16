# Etapa 5 - Operações e DevOps

## 1. Pipeline de CI/CD e Deploy

**User:**
Etapa 5 – Operações INICIANDO....

Proponha um pipeline de deploy para o sistema em questão (ex.: Docker + CI/CD).

**GitHub Copilot:**
*Ação: Criação do arquivo `docs/pipeline_deploy.md`.*

Foi elaborada e documentada uma proposta de pipeline de deploy automatizado. O documento detalha o uso de **Docker** para containerização e **GitHub Actions** como ferramenta de CI/CD, cobrindo as etapas de build, testes automatizados e deploy em ambientes de homologação e produção.

---

## 2. Monitoramento e Observabilidade

**User:**
Defina métricas e logs a serem monitorados (disponibilidade, latência, erros).

**GitHub Copilot:**
*Ação: Criação do arquivo `docs/monitoramento_metricas_logs.md`.*

As estratégias de monitoramento foram definidas no arquivo `docs/monitoramento_metricas_logs.md`. O documento especifica as principais métricas de **RED** (Rate, Errors, Duration) e **USE** (Utilization, Saturation, Errors), além de definir a estrutura de logs estruturados para facilitar a depuração e o acompanhamento da saúde do sistema (disponibilidade e latência).

---

## 3. Resposta a Incidentes (Runbook)

**User:**
Descreva um procedimento de resposta a falhas (runbook)

**GitHub Copilot:**
*Ação: Criação do arquivo `docs/runbook_resposta_falhas.md`.*

Um procedimento operacional padrão para resposta a incidentes (Runbook) foi criado e documentado em `docs/runbook_resposta_falhas.md`. O guia abrange desde a detecção e triagem do incidente, passando pelo processo de escalonamento e mitigação, até a análise de causa raiz (Post-Mortem) para prevenção de recorrências.