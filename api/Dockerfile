FROM maven:3.9.6-eclipse-temurin-21-alpine

ENV LANG=pt_BR.UTF-8
ENV LC_ALL=pt_BR.UTF-8

RUN apk add --no-cache musl-locales musl-locales-lang && \
    mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./pom.xml ./
RUN mvn dependency:go-offline

COPY . .

RUN mvn clean package -DskipTests

CMD ["mvn", "spring-boot:run"]
EXPOSE 8080