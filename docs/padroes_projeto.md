# Padrões de Projeto Aplicáveis

## 1. **Repository**
- **Descrição**: Este padrão é utilizado para abstrair a lógica de acesso ao banco de dados, centralizando as operações de persistência em uma camada específica.
- **Aplicação no Sistema**:
  - Gerenciar as operações de CRUD para as entidades `Quarto`, `Hóspede` e `Reserva`.
  - Facilitar a troca do banco de dados (ex.: de PostgreSQL para outro) sem impactar as camadas superiores.
- **Benefícios**:
  - Promove a separação de responsabilidades.
  - Facilita a manutenção e os testes unitários.

---

## 2. **Factory**
- **Descrição**: Este padrão é utilizado para criar objetos complexos, encapsulando a lógica de criação em uma classe ou método específico.
- **Aplicação no Sistema**:
  - Criar instâncias de `Reserva` com validações e cálculos iniciais (ex.: calcular o valor total com base nas diárias).
  - Garantir que objetos sejam criados em um estado consistente.
- **Benefícios**:
  - Reduz a duplicação de código na criação de objetos.
  - Facilita a adição de novas regras de inicialização.

---

## 3. **Singleton**
- **Descrição**: Este padrão garante que uma classe tenha apenas uma instância e fornece um ponto global de acesso a ela.
- **Aplicação no Sistema**:
  - Gerenciar a conexão com o banco de dados, garantindo que apenas uma instância seja criada durante o ciclo de vida da aplicação.
- **Benefícios**:
  - Reduz o consumo de recursos.
  - Evita problemas de concorrência relacionados a múltiplas conexões.

---

## 4. **Observer**
- **Descrição**: Este padrão permite que objetos sejam notificados sobre mudanças em outros objetos aos quais estão observando.
- **Aplicação no Sistema**:
  - Notificar o frontend sobre mudanças no status de um quarto (ex.: de "Livre" para "Ocupado").
  - Implementar notificações em tempo real utilizando WebSockets ou bibliotecas como Socket.IO.
- **Benefícios**:
  - Facilita a implementação de funcionalidades reativas.
  - Reduz o acoplamento entre os componentes.

---

## 5. **Decorator**
- **Descrição**: Este padrão permite adicionar funcionalidades a objetos de forma dinâmica, sem alterar sua estrutura.
- **Aplicação no Sistema**:
  - Adicionar funcionalidades extras às reservas, como descontos ou taxas adicionais, sem modificar a classe principal.
- **Benefícios**:
  - Promove a reutilização de código.
  - Facilita a extensão de funcionalidades sem alterar o código existente.

---

## 6. **Strategy**
- **Descrição**: Este padrão define uma família de algoritmos, encapsula cada um deles e os torna intercambiáveis.
- **Aplicação no Sistema**:
  - Implementar diferentes estratégias de cálculo de preços para quartos (ex.: preços dinâmicos com base na demanda).
- **Benefícios**:
  - Facilita a adição de novos algoritmos sem alterar o código existente.
  - Promove a flexibilidade e a reutilização de código.

---

## 7. **MVC (Model-View-Controller)**
- **Descrição**: Este padrão separa a aplicação em três camadas principais: Model (dados e lógica de negócios), View (interface do usuário) e Controller (intermediação entre Model e View).
- **Aplicação no Sistema**:
  - Organizar o frontend React seguindo o padrão MVC para separar a lógica de apresentação da lógica de negócios.
- **Benefícios**:
  - Facilita a manutenção e a escalabilidade do código.
  - Promove a separação de responsabilidades.

---

## Conclusão
A aplicação desses padrões de projeto no sistema de reservas garantirá um código mais modular, reutilizável e fácil de manter. Além disso, eles ajudam a lidar com a complexidade do sistema, promovendo boas práticas de desenvolvimento e facilitando futuras expansões.