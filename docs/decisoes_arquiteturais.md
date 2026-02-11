# Decisões Arquiteturais Críticas (ADR)

Este documento registra as decisões técnicas fundamentais tomadas durante o projeto.

## ADR-01: Adoção de Clean Architecture no Backend
- **Contexto**: Necessidade de um sistema fácil de testar e manter.
- **Decisão**: Dividir o sistema em camadas (Domain, Application, Infra, Presentation).
- **Consequência**: Regras de negócio ficam protegidas de mudanças em tecnologias externas (banco de dados, frameworks web).

## ADR-02: Uso de TypeScript (Frontend e Backend)
- **Contexto**: Projetos em JS puro tendem a ter bugs de tipo difíceis de rastrear.
- **Decisão**: Utilizar TS para definir interfaces de dados em todo o fluxo (da API ao Componente).
- **Consequência**: Maior segurança em refatorações e autocompletar eficiente no editor de código.

## ADR-03: Monolito Modular vs Microserviços
- **Contexto**: O sistema atende a um único hotel (escopo reduzido).
- **Decisão**: Utilizar um monolito modular.
- **Consequência**: Deploy simplificado e ausência de latência de rede entre módulos, mantendo a porta aberta para futura extração de serviços.

## ADR-04: Persistência de Dados via Repositories
- **Contexto**: Evitar acoplamento direto com ORMs no código de aplicação.
- **Decisão**: Inverter a dependência através do padrão Repository.
- **Consequência**: Facilidade em trocar ou atualizar o banco de dados sem afetar os casos de uso.
