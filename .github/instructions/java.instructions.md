---
description: "Java 21 and Spring Boot 3.x coding standards for the CIVIC demo"
applyTo: "**/*.java"
---

# Java Coding Standards

These standards apply to all Java code in the CIVIC demo project. Follow them when creating or modifying Java files.

## Technology Stack

The project uses the following technologies:

* **Java 21** with virtual threads support
* **Spring Boot 3.x** for application framework
* **Spring Data JPA** for data access
* **Flyway** for database migrations
* **H2** for local development (with Azure SQL compatibility mode)
* **Azure SQL** for production database

## Package Structure

Organize code into the following package structure:

```text
com.ontario.program
├── controller/    # REST controllers
├── service/       # Business logic
├── repository/    # JPA repositories
├── model/         # JPA entities
├── dto/           # Request/Response DTOs
└── config/        # Configuration classes
```

Package responsibilities:

* `controller` - HTTP endpoints and request handling
* `service` - Business logic and transaction management
* `repository` - Database access via Spring Data JPA
* `model` - Entity classes mapped to database tables
* `dto` - Data transfer objects for API contracts
* `config` - Spring configuration and beans

## Entity Conventions

Use `jakarta.persistence` annotations for entity mapping.

```java
package com.ontario.program.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "program")
public class Program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_en", nullable = false, length = 200)
    private String nameEn;

    @Column(name = "name_fr", nullable = false, length = 200)
    private String nameFr;

    @Column(name = "description_en", columnDefinition = "NVARCHAR(MAX)")
    private String descriptionEn;

    @Column(name = "description_fr", columnDefinition = "NVARCHAR(MAX)")
    private String descriptionFr;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Getters and setters
}
```

Entity rules:

* Use `jakarta.persistence` package (not `javax.persistence`)
* Bilingual fields use `nameEn`/`nameFr` suffix pattern
* Timestamps use `LocalDateTime` type
* ID generation uses `GenerationType.IDENTITY`
* Column names use snake_case in `@Column` annotation

## Repository Conventions

Extend `JpaRepository` for standard CRUD operations.

```java
package com.ontario.program.repository;

import com.ontario.program.model.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {

    // Method name query
    List<Program> findByProgramTypeId(Long programTypeId);

    // Custom query with named parameters
    @Query("SELECT p FROM Program p WHERE p.nameEn LIKE %:searchTerm% OR p.nameFr LIKE %:searchTerm%")
    List<Program> searchByName(@Param("searchTerm") String searchTerm);
}
```

Repository rules:

* Extend `JpaRepository<EntityType, IdType>`
* Use method name queries for simple lookups
* Use `@Query` with named parameters for complex queries
* Include `@Repository` annotation for clarity

## Service Conventions

Use constructor injection and explicit transaction annotations.

```java
package com.ontario.program.service;

import com.ontario.program.dto.CreateProgramRequest;
import com.ontario.program.dto.ProgramResponse;
import com.ontario.program.model.Program;
import com.ontario.program.repository.ProgramRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProgramService {

    private final ProgramRepository programRepository;

    // Constructor injection - no @Autowired needed
    public ProgramService(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    @Transactional(readOnly = true)
    public List<ProgramResponse> getAllPrograms() {
        return programRepository.findAll()
            .stream()
            .map(this::toResponse)
            .toList();
    }

    @Transactional
    public ProgramResponse createProgram(CreateProgramRequest request) {
        Program program = new Program();
        program.setNameEn(request.nameEn());
        program.setNameFr(request.nameFr());
        program.setCreatedAt(LocalDateTime.now());

        Program saved = programRepository.save(program);
        return toResponse(saved);
    }

    private ProgramResponse toResponse(Program program) {
        return new ProgramResponse(
            program.getId(),
            program.getNameEn(),
            program.getNameFr()
        );
    }
}
```

Service rules:

* Use constructor injection (no `@Autowired` on fields)
* Add `@Transactional(readOnly = true)` for read-only methods
* Add `@Transactional` for write methods
* Keep business logic in service layer, not controllers

## Controller Conventions

Use `@RestController` with explicit response types.

```java
package com.ontario.program.controller;

import com.ontario.program.dto.CreateProgramRequest;
import com.ontario.program.dto.ProgramResponse;
import com.ontario.program.service.ProgramService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
public class ProgramController {

    private final ProgramService programService;

    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping
    public ResponseEntity<List<ProgramResponse>> getAllPrograms() {
        List<ProgramResponse> programs = programService.getAllPrograms();
        return ResponseEntity.ok(programs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProgramResponse> getProgram(@PathVariable Long id) {
        return programService.getProgram(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProgramResponse> createProgram(
            @Valid @RequestBody CreateProgramRequest request) {
        ProgramResponse created = programService.createProgram(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
```

Controller rules:

* Use `@RestController` with `@RequestMapping` base path
* Return `ResponseEntity<T>` for all endpoints
* Use `@Valid` for request body validation
* Use `@PathVariable` for URL path parameters
* Use `@RequestParam` for query parameters

## DTO Conventions

Use Java records for immutable DTOs with validation.

```java
package com.ontario.program.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateProgramRequest(
    @NotBlank(message = "English name is required")
    @Size(max = 200, message = "English name must not exceed 200 characters")
    String nameEn,

    @NotBlank(message = "French name is required")
    @Size(max = 200, message = "French name must not exceed 200 characters")
    String nameFr,

    @NotNull(message = "Program type is required")
    Long programTypeId,

    String descriptionEn,

    String descriptionFr
) {}
```

```java
package com.ontario.program.dto;

public record ProgramResponse(
    Long id,
    String nameEn,
    String nameFr,
    String programTypeName,
    String status
) {}
```

DTO rules:

* Use Java records for immutability
* Apply Bean Validation annotations: `@NotBlank`, `@Size`, `@NotNull`
* Include validation messages for user feedback
* Keep DTOs in the `dto` package

## Error Handling

Use RFC 7807 `ProblemDetail` for error responses.

```java
package com.ontario.program.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationException(MethodArgumentNotValidException ex) {
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problem.setTitle("Validation Error");
        problem.setType(URI.create("https://ontario.ca/problems/validation-error"));

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );
        problem.setProperty("errors", errors);

        return problem;
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleNotFound(ResourceNotFoundException ex) {
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
        problem.setTitle("Resource Not Found");
        problem.setDetail(ex.getMessage());
        return problem;
    }
}
```

Error handling rules:

* Use `@RestControllerAdvice` for global exception handling
* Return `ProblemDetail` (RFC 7807) for all errors
* Map exceptions to appropriate HTTP status codes
* Include validation field errors in the response

## Testing Conventions

Use JUnit 5 with Mockito and Given/When/Then naming.

```java
package com.ontario.program.service;

import com.ontario.program.dto.CreateProgramRequest;
import com.ontario.program.dto.ProgramResponse;
import com.ontario.program.model.Program;
import com.ontario.program.repository.ProgramRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProgramServiceTest {

    @Mock
    private ProgramRepository programRepository;

    @InjectMocks
    private ProgramService programService;

    @Test
    void givenProgramsExist_whenGetAllPrograms_thenReturnProgramList() {
        // Given
        Program program = new Program();
        program.setId(1L);
        program.setNameEn("Test Program");
        program.setNameFr("Programme de test");
        when(programRepository.findAll()).thenReturn(List.of(program));

        // When
        List<ProgramResponse> result = programService.getAllPrograms();

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).nameEn()).isEqualTo("Test Program");
    }

    @Test
    void givenValidRequest_whenCreateProgram_thenReturnCreatedProgram() {
        // Given
        CreateProgramRequest request = new CreateProgramRequest(
            "New Program", "Nouveau programme", 1L, null, null
        );
        Program saved = new Program();
        saved.setId(1L);
        saved.setNameEn("New Program");
        saved.setNameFr("Nouveau programme");
        when(programRepository.save(any())).thenReturn(saved);

        // When
        ProgramResponse result = programService.createProgram(request);

        // Then
        assertThat(result.id()).isEqualTo(1L);
        assertThat(result.nameEn()).isEqualTo("New Program");
    }
}
```

Testing rules:

* Use JUnit 5 with `@Test` annotations
* Use Mockito: `@Mock`, `@InjectMocks`, `@ExtendWith(MockitoExtension.class)`
* Name tests using Given/When/Then pattern
* Use AssertJ for fluent assertions
* Use `@SpringBootTest` for integration tests

## Local Profile Configuration

Configure the local development profile for H2 compatibility.

```yaml
# application-local.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb;MODE=MSSQLServer;DATABASE_TO_LOWER=TRUE
    driver-class-name: org.h2.Driver
    username: sa
    password:
  h2:
    console:
      enabled: true
      path: /h2-console
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
  flyway:
    enabled: true
    locations: classpath:db/migration
```

Local profile rules:

* Profile name: `local`
* H2 with `MODE=MSSQLServer` for Azure SQL compatibility
* Flyway enabled for consistent schema management
* H2 console available at `/h2-console`
* Set `ddl-auto: validate` to ensure Flyway manages schema

Run with local profile:

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```
