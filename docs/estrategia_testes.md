# Estratégia de Cobertura de Testes

A estratégia de testes definida para o sistema de gestão hoteleira baseia-se no conceito de **Pirâmide de Testes**, priorizando a agilidade no desenvolvimento e a confiabilidade nos fluxos críticos.

## 1. Testes Unitários (Base da Pirâmide)
- **Foco**: Lógica de domínio e regras de negócio isoladas.
- **Implementação**: Testamos o `GestaoQuartosService` para garantir que o cadastro e edição de quartos respeitem restrições como campos obrigatórios e unicidade de número.
- **Vantagem**: Execução extremamente rápida e feedback imediato durante a codificação.

## 2. Testes de Integração (Meio da Pirâmide)
- **Foco**: Comunicação entre diferentes módulos/serviços e persistência.
- **Fluxo Crítico**: Validamos o processo que une **Hóspede**, **Reserva** e **Quarto**. Garantimos que a criação de uma reserva cause o efeito colateral esperado de alterar a disponibilidade do quarto.
- **Vantagem**: Garante que o sistema funcione como um todo, validando a "cola" entre os componentes.

## 3. Mocking e Isolamento
- Utilizamos o padrão **Repository** para abstrair a persistência.
- Nos testes, empregamos implementações em memória (`RepositoryMemory`) e **Mocks** para evitar dependências de infraestrutura externa (bancos de dados reais), tornando os testes determinísticos e rápidos.

## 4. Garantia de Qualidade Contínua
- A configuração com **Jest** e **TypeScript (ESM)** permite que os testes sejam executados automaticamente em pipelines de CI/CD, prevenindo regressões a cada novo commit.
