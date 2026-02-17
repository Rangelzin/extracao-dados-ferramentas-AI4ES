# Etapa 3 - Construção (Stack 2: Java + Spring)

## 1. Configuração Inicial e Domínio

**User:**
Etapa 3 – Construção (Geração de Código) (Stack 2 com Java) iniciando....
Implemente as classes para: Quarto, Hóspede e Reserva.
(Fornecida estrutura de pastas desejada: `code/stack-2/backend` e `code/stack-2/frontend`).

**GitHub Copilot:**
*Ação: Criação da estrutura de pastas e entidades de domínio.*

Foram criados os diretórios e os arquivos iniciais do modelo de domínio na pasta `code/stack-2/backend/src/main/java/com/example/model`:
* `Quarto.java`
* `Hospede.java`
* `Reserva.java`

---

## 2. Configuração de Dependências e Build

**User:**
garanta o pom

**GitHub Copilot:**
*Ação: Criação do arquivo `pom.xml`.*

O arquivo de configuração do Maven foi criado incluindo dependências essenciais: `spring-boot-starter-web`, `data-jpa`, `h2` e `starter-test`.

**User:**
(Relato de erros de compilação: versões faltando no pom e falta de classe principal)

**GitHub Copilot:**
*Ação: Correção do `pom.xml` e criação da classe Main.*

* Foram ajustadas as versões dos plugins no `pom.xml`.
* Foi criada a classe de entrada `HotelReservationApplication.java` com a anotação `@SpringBootApplication` para permitir a execução do servidor.

---

## 3. Implementação do Módulo de Quartos

**User:**
Considerando o módulo de Gestão de Quartos, implemente: Cadastro, Edição, Listagem (com campos específicos) e Suporte a múltiplas camas.

**GitHub Copilot:**
*Ação: Implementação da Camada de Serviço e Controle.*

Foram criados os arquivos:
* `QuartoController.java`: Endpoints REST para POST, PUT e GET.
* `QuartoService.java`: Lógica de negócios.
* A classe `Quarto` foi atualizada para suportar listas de camas e status de disponibilidade.

**User:**
(Relato de erro de compilação: `cannot find symbol class QuartoService`)

**GitHub Copilot:**
*Ação: Correção de importações.*

O código do `QuartoController` foi corrigido para importar corretamente o `QuartoService`.

---

## 4. Refatoração e Qualidade de Código

**User:**
Garanta princípios SOLID e clean code e Explique decisões de implementação em comentários.

**GitHub Copilot:**
*Ação: Refatoração e Documentação.*

O código foi revisado para aplicar injeção de dependência (DIP) e responsabilidade única (SRP). Foram adicionados comentários Javadoc explicando a arquitetura e a finalidade de cada método.

---

## 5. Implementação do Frontend

**User:**
implemente o frontend com html, js e css para consumir essa api no navegador de acord com os requesitos

**GitHub Copilot:**
*Ação: Criação dos arquivos do Frontend.*

Na pasta `code/stack-2/frontend`, foram criados:
* `index.html`: Estrutura da página.
* `css/styles.css`: Estilização básica.
* `js/scripts.js`: Lógica de consumo da API via `fetch`.

**User:**
ta muito ruim para UI/UX e o forms não funciona / Ainda continua

**GitHub Copilot:**
*Ação: Melhoria de Interface e Usabilidade.*

O frontend passou por duas rodadas de refatoração para:
* Melhorar o design visual (CSS moderno e responsivo).
* Adicionar validação de formulário no lado do cliente.
* Implementar feedback visual (mensagens de sucesso/erro) para o usuário.

---

## 6. Integração e Resolução de CORS

**User:**
(Série de erros relatados: "Requisição cross-origin bloqueada", falha na requisição CORS).

**GitHub Copilot:**
*Ação: Configuração de CORS no Backend.*

Identificado bloqueio de segurança do navegador.
* Foi adicionada uma configuração global de CORS no Spring Boot permitindo origens cruzadas (`http://localhost:5500`, `http://localhost:3000`).
* Ajustes nos métodos permitidos (GET, POST, PUT, OPTIONS).

---

## 7. Servindo Frontend via Spring Boot (Solução Final)

**User:**
No navegador o link http://localhost:3000 aparece iss (Índice de diretórios) / Requisição cross-origin bloqueada...

**GitHub Copilot:**
*Ação: Configuração para servir arquivos estáticos e Unificação.*

Para resolver definitivamente os problemas de integração e portas:
1.  Foi criada a classe `WebConfig.java` para mapear recursos estáticos, permitindo que o Spring Boot sirva o frontend diretamente.
2.  Resolvidos conflitos de porta (8080 em uso) encerrando processos anteriores.
3.  O Backend passou a servir o `index.html` e os assets estáticos (`js`, `css`).

**User:**
rodou no link: http://localhost:3000/code/stack-2/frontend/

**GitHub Copilot:**
*Ação: Confirmação de Sucesso.*

O sistema Fullstack (Java/Spring servindo Frontend estático) foi validado e está funcional, acessível pelo navegador.