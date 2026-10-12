# ===================================================
# Multi-stage Dockerfile for Spring Boot (Monorepo Root)
# ===================================================

# Stage 1: Build JAR using Maven
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Cache Maven dependencies
COPY backend/pom.xml .
RUN mvn dependency:go-offline -B

# Copy backend source code & package
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal JRE Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
