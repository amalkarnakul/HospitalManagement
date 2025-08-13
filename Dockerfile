# Stage 1: Build the application with Maven
FROM maven:3.9.6-eclipse-temurin-17-focal AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml to leverage Docker's layer caching
COPY pom.xml .

# Download all dependencies
RUN mvn dependency:go-offline

# Copy the rest of your source code
COPY src ./src

# Package the application, skipping tests for a faster build
RUN mvn package -DskipTests


# Stage 2: Create the final, smaller image
FROM eclipse-temurin:17-jre-jammy

# Set the working directory
WORKDIR /app

# Copy the built .jar file from the 'builder' stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port that Spring Boot runs on (default is 8080)
EXPOSE 8080

# The command to run your application
ENTRYPOINT ["java", "-jar", "app.jar"]