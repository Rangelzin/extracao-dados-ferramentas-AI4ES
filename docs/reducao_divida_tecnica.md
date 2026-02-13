# Redução de Dívida Técnica e Sustentabilidade de Código

Este documento explica como as refatorações e padrões arquiteturais aplicados no sistema de gestão hoteleira reduzem a dívida técnica e facilitam a manutenção a longo prazo.

## 1. Modularização e Separação de Preocupações (SoC)
Antes da refatoração, o `App.tsx` acumulava múltiplas responsabilidades (UI, lógica de estado, chamadas de API).
- **Como reduz a dívida**: Ao isolar componentes (`RoomForm`, `RoomTable`), podemos alterar o layout de um sem risco de quebrar a lógica do outro. Se precisarmos mudar o formulário para um modal, a lógica de listagem permanece intacta.

## 2. Tipagem Estrita com TypeScript (Type Safety)
A eliminação do tipo `any` e o uso de interfaces compartilhadas (`CriarQuartoDTO`, `Quarto`) entre frontend e backend são fundamentais.
- **Como reduz a dívida**: Erros de "campo indefinido" ou mudanças em contratos de API são detectados em tempo de compilação. Se o backend renomear o campo `precoDiaria`, o frontend apontará erro imediatamente, evitando bugs em produção.

## 3. Inversão de Dependência (DIP) e Camada de Serviço
O frontend agora utiliza uma camada de serviço (`api.ts`) e o backend utiliza interfaces de repositório.
- **Como reduz a dívida**: O sistema não está "casado" com uma implementação específica. Se amanhã decidirmos trocar o `fetch` por `Axios` ou o repositório em memória por um banco de dados real (PostgreSQL/MongoDB), a mudança será localizada e não exigirá refatoração em toda a lógica de negócio.

## 4. Hooks Customizados (Encapsulamento de Lógica)
A criação do hook `useQuartos` isola o estado complexo da aplicação.
- **Como reduz a dívida**: Promove o reuso de código. Se criarmos uma versão mobile ou uma nova página de dashboard, basta importar o hook para ter toda a lógica de sincronização pronta, sem duplicar código de carregamento ou tratamento de erro.

## 5. Clean Code e Documentação Viva
O uso de JSDoc, nomes semânticos e a organização de pastas facilitam o "onboarding" de novos desenvolvedores.
- **Como reduz a dívida**: Código legível gasta menos tempo de leitura e mais tempo de produção. Reduz o custo cognitivo para entender o que uma função faz, diminuindo a chance de introduzir bugs durante correções futuras.

## 6. Cobertura de Testes Automatizados
A infraestrutura de testes criada na Etapa 4 protege o sistema contra regressões.
- **Como reduz a dívida**: Permite que refatorações futuras sejam feitas com confiança. Se uma alteração quebrar uma regra de negócio (ex: permitir número de quarto duplicado), o teste falhará instantaneamente, impedindo que o código ruim chegue ao deploy.
