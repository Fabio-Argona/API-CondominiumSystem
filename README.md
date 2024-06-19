Documentação do Sistema de Controle e Administração de Condomínio
Introdução
Este documento descreve a arquitetura e o design de um sistema de controle e administração de condomínio, que inclui funcionalidades para gestão de moradores, unidades, despesas, e reservas de áreas comuns. O backend será implementado em Java, o frontend em Angular, e o banco de dados em MongoDB.

Arquitetura do Sistema
Diagrama de Arquitetura
markdown
Copiar código
| Frontend (Angular) |
----------------------
| Backend (Java)     |
----------------------
| Database (MongoDB) |
Tecnologias Utilizadas
Frontend: Angular
Backend: Java (Spring Boot)
Banco de Dados: MongoDB
Funcionalidades Principais
Gestão de Moradores

Cadastro de moradores
Edição de informações dos moradores
Exclusão de moradores
Listagem de moradores
Gestão de Unidades

Cadastro de unidades (apartamentos/casas)
Edição de informações das unidades
Exclusão de unidades
Listagem de unidades
Gestão de Despesas

Cadastro de despesas do condomínio
Edição de informações das despesas
Exclusão de despesas
Listagem de despesas
Rateio das despesas entre os moradores
Gestão de Reservas de Áreas Comuns

Cadastro de reservas
Edição de reservas
Cancelamento de reservas
Listagem de reservas
Estrutura do Projeto
Backend (Java - Spring Boot)
Pacotes
controller: Contém as classes controladoras que lidam com as requisições HTTP.
service: Contém a lógica de negócio.
repository: Interage com o MongoDB para operações CRUD.
model: Define as entidades do sistema.
config: Configurações do Spring Boot e MongoDB.
Dependências (Maven)
xml
Copiar código
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-mongodb</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.modelmapper</groupId>
        <artifactId>modelmapper</artifactId>
    </dependency>
</dependencies>

Conclusão
Este documento fornece uma visão geral da estrutura e das principais funcionalidades do sistema de controle e administração de condomínio. A arquitetura baseada em serviços e o uso de tecnologias modernas como Angular, Spring Boot e MongoDB garantem um sistema escalável e de fácil manutenção.
