# Arquitetura do Sistema - Reserva de Hotel

Este documento descreve a estrutura técnica do sistema utilizando Node.js, React e TypeScript.

## 1. Estilo Arquitetural: Monolito Modular
Dado que o sistema é para um único hotel, um monolito modular reduz a complexidade de infraestrutura enquanto mantém o código organizado por domínios.

## 2. Camadas do Backend (Clean Architecture)

- **Domain**: Contém as entidades de negócio (ex: `Room`, `Guest`, `Booking`) e interfaces de repositórios. É agnóstico a frameworks.
- **Application**: Implementa os Casos de Uso (ex: `CreateBookingUseCase`). Coordena como os dados fluem de e para as entidades.
- **Infrastructure**: Implementações técnicas. Conexão com banco de dados, bibliotecas de terceiros (ex: validadores de CPF) e implementações reais de repositórios.
- **Presentation**: Ponto de entrada da aplicação. Define as rotas HTTP (Express) e os Controllers que processam as requisições.

## 3. Estrutura do Frontend (React)

- **Components**: Componentes atômicos e modernos (Botões, Inputs, Chips).
- **Hooks**: Gerenciamento de estado e lógica de consumo de dados (SWR ou React Query).
- **Pages**: Layouts principais (Cadastro de Quarto, Lista de Reservas, etc).
- **Theme**: Definição da paleta de cores (Verde e Azul) e padrões visuais.

## 4. Comunicação
-- **API**: RESTful API utilizando JSON.
-- **Segurança**: Validação de tipos rigorosa com TypeScript em ambas as pontas.

## 5. Justificativas da Escolha

### Desempenho
- **Baixa Latência**: A comunicação entre módulos ocorre em memória, eliminando o overhead de rede comum em microserviços.
- **Node.js**: Ideal para operações de I/O intensivas (consultas a banco de dados e APIs), garantindo respostas rápidas na interface React.

### Escalabilidade
- **Modularidade**: A separação clara de responsabilidades permite que, caso a demanda cresça, partes específicas do sistema sejam escaladas ou migradas para serviços independentes sem reescrever o core do negócio.
- **Stateless**: O backend será projetado para ser sem estado, permitindo rodar múltiplas instâncias atrás de um balanceador de carga se necessário.

### Manutenção
- **Tipagem Forte**: O uso de TypeScript em toda a stack reduz drasticamente bugs em produção e facilita refatorações seguras.
- **Testabilidade**: A Clean Architecture permite testar regras de negócio (Domain/Application) isoladamente, sem necessidade de banco de dados ou servidor web ativos, garantindo uma base de código confiável a longo prazo.
