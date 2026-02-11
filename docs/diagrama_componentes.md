# Diagrama de Componentes

Este diagrama utiliza a sintaxe PlantUML para descrever a organização modular do sistema.

```plantuml
@startuml
package "Frontend (React + TS)" {
  [UI Components] <<Modern Library>>
  [State Management / Hooks] as State
  [API Client (Axios/Fetch)] as API_Client
}

package "Backend (Node.js + TS)" {
  package "Presentation Layer" {
    [Express Routes] as Routes
    [Controllers] as Controllers
  }

  package "Application Layer" {
    [Use Cases] as UC
  }

  package "Domain Layer" {
    [Entities] as Entities
    [Repository Interfaces] as RepoInterfaces
  }

  package "Infrastructure Layer" {
    [Database (TypeORM/Prisma)] as DB
    [External Services] as External
  }
}

' Relacionamentos
[UI Components] --> State
State --> API_Client
API_Client ..> Routes : HTTP/JSON

Routes --> Controllers
Controllers --> UC
UC --> Entities
UC --> RepoInterfaces

RepoInterfaces <|.. DB : implements
DB --> [Database Engine]
@enduml
```

## Descrição das Interações
1. **Frontend** envia requisições JSON via **API Client**.
2. **Presentation Layer** recebe a requisição e delega para o **Caso de Uso** correspondente.
3. **Application Layer** executa a lógica de negócio utilizando as **Entidades**.
4. A persistência é feita via **Inversão de Dependência**: a aplicação usa interfaces, e a **Infrastructure** provê a implementação real (Banco de Dados).
