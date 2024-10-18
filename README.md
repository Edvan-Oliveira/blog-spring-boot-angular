## Pré-Requisitos

Para executar localmente, será necessário ter instalados em sua máquina os seguintes programas: [Java](https://www.java.com/pt-BR/), [Git](https://git-scm.com/), [Maven](https://maven.apache.org/), [Node.js](https://nodejs.org/pt) e [Docker](https://www.docker.com/).

Instalação do Angular 17

```bash
$ npm install -g @angular/cli@17
```

## Passos para executar o projeto

```bash
$ git clone https://github.com/Edvan-Oliveira/blog-spring-boot-angular.git

$ cd blog-spring-boot-angular

$ docker-compose up -d

$ cd api

$ mvn clean install -DskipTests

$ cd target

$ java -jar api-0.0.1-SNAPSHOT.jar

```
Abra um novo terminal na pasta do projeto (blog-spring-boot-angular)

```bash

$ cd web

$ npm install

$ ng serve

```

Abra o navegador na URL http://localhost:4200/