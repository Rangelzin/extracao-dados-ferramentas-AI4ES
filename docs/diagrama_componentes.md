# Diagrama de Componentes - Sistema de Reserva de Hotel

Este documento contém a representação dos componentes do sistema utilizando a notação UML (PlantUML).

## Código PlantUML

```plantuml
@startuml
!theme plain
skinparam componentStyle uml2

package "Client Side (Browser)" {
    [Single Page Application (React)] as SPA
}

package "Server Side (Node.js Monolith)" {
    interface "API REST (JSON)" as HTTP_API
    
    component "API Gateway / Controllers" as API_Layer
    
    package "Business Logic Modules" {
        component "Módulo de Quartos" as ModQuartos
        component "Módulo de Hóspedes" as ModHospedes
        component "Módulo de Reservas" as ModReservas
    }
    
    component "Persistence Layer (Prisma/TypeORM)" as ORM
}

database "PostgreSQL" as DB

' Relacionamentos
SPA .-> HTTP_API : HTTPS
HTTP_API - API_Layer

API_Layer --> ModQuartos
API_Layer --> ModHospedes
API_Layer --> ModReservas

ModReservas ..> ModQuartos : Verifica Disponibilidade
ModReservas ..> ModHospedes : Valida Hóspede

ModQuartos --> ORM
ModHospedes --> ORM
ModReservas --> ORM

ORM --> DB : SQL Queries

@enduml
```

## Descrição dos Componentes

1.  **SPA (React)**: Aplicação web que o recepcionista utiliza.
2.  **API Gateway / Controllers**: Ponto de entrada das requisições, validação de input e roteamento.
3.  **Módulos de Negócio**:
    *   **Quartos**: Gerencia tipos de quartos, camas e status.
    *   **Hóspedes**: Gerencia cadastro de clientes.
    *   **Reservas**: Orquestra a criação de reservas, garantindo regras de negócio (ex: não reservar quarto ocupado).
4.  **Persistence Layer**: Abstração do banco de dados (ORM) para realizar operações CRUD.
5.  **PostgreSQL**: Armazenamento persistente relacional.
