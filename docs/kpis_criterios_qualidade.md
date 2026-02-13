# KPIs e Critérios de Qualidade

Este documento define os indicadores de performance e os padrões de qualidade para o Sistema de Reserva Hoteleira.

## 1. Key Performance Indicators (KPIs)

### 1.1. Performance Técnica
- **Tempo de Resposta Médio (API)**: < 200ms para operações de leitura e < 500ms para escrita.
- **Disponibilidade (Uptime)**: Mínimo de 99.9% (SLA).
- **Taxa de Erro (Error Rate)**: < 1% do total de requisições.
- **Tamanho do Bundle (Frontend)**: < 250KB (Gzip) para o carregamento inicial.

### 1.2. Qualidade de Código
- **Cobertura de Testes**: Mínimo de 80% de cobertura de linhas no Backend.
- **Complexidade Ciclomática**: Média < 10 por função.
- **Dívida Técnica**: Proporção de "Code Smell" < 5% (via ferramentas de análise estática).

### 1.3. Sucesso do Negócio
- **Tempo Médio de Reserva**: Tempo que um hóspede leva para concluir uma reserva deve ser < 2 minutos.
- **Taxa de Ocupação**: Visualização em tempo real da ocupação do hotel.

## 2. Critérios de Qualidade

### 2.1. Funcionalidade
- O sistema deve validar todos os inputs (CPF, Email, Preço positivo).
- O status do quarto deve ser alterado automaticamente após o check-in/reserva.

### 2.2. Usabilidade (UX/UI)
- **Responsividade**: Interface funcional em Mobile, Tablet e Desktop.
- **Acessibilidade**: Contraste de cores verde/azul seguindo WCAG 2.1 (AA).
- **Feedback**: Notificações visuais (Toasts) para todas as ações de sucesso ou erro.

### 2.3. Manutenibilidade
- Uso rigoroso de **TypeScript** com `strict: true`.
- Seguimento dos princípios **SOLID** e **Clean Architecture**.
- Documentação de API atualizada (Swagger/OpenAPI).

### 2.4. Segurança
- Sanitização de todos os inputs para prevenir XSS e NoSQL Injection.
- Autenticação e Autorização em todos os endpoints sensíveis (futura implementação).
