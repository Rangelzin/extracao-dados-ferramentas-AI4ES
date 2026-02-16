# Runbook – Procedimento de Resposta a Falhas

## 1. Objetivo
Orientar a equipe sobre como agir rapidamente diante de falhas no sistema, minimizando impacto e tempo de indisponibilidade.

## 2. Detecção da Falha
- Monitoramento detecta anomalia (alerta de indisponibilidade, latência alta ou erro).
- Alerta é enviado para o canal da equipe (ex: Slack, e-mail, PagerDuty).

## 3. Primeira Ação
- Confirmar a falha acessando o sistema e verificando logs/monitoramento.
- Classificar a gravidade (crítica, alta, média, baixa).

## 4. Diagnóstico Inicial
- Identificar o escopo: backend, frontend, banco, rede, etc.
- Verificar logs recentes e métricas (erros, picos de uso, deploys recentes).
- Checar status dos serviços (Docker, banco, API, etc).

## 5. Resolução
- **Falha de serviço:**
  - Reiniciar serviço/container afetado.
  - Se não resolver, restaurar último backup funcional.
- **Erro de código:**
  - Reverter para versão estável anterior.
  - Abrir incidente para correção definitiva.
- **Infraestrutura:**
  - Acionar suporte do provedor (cloud, rede, etc).

## 6. Comunicação
- Informar status para stakeholders e usuários (ex: página de status, e-mail).
- Atualizar a cada etapa relevante (diagnóstico, mitigação, resolução).

## 7. Pós-Incidente
- Registrar causa raiz e ações tomadas.
- Atualizar documentação e runbook se necessário.
- Planejar ações preventivas (testes, automações, melhorias).

## 8. Checklist Rápido
- [ ] Alerta recebido e reconhecido
- [ ] Falha confirmada
- [ ] Gravidade classificada
- [ ] Diagnóstico realizado
- [ ] Ação corretiva aplicada
- [ ] Comunicação feita
- [ ] Pós-mortem registrado

---

Este runbook visa padronizar a resposta a falhas, garantindo agilidade, transparência e aprendizado contínuo.