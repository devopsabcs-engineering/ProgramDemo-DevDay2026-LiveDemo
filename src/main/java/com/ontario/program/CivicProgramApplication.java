package com.ontario.program;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application entry point for the CIVIC Program API.
 * <p>
 * This Spring Boot application provides REST APIs for managing
 * program submissions in the Ontario CIVIC program approval system.
 * </p>
 */
@SpringBootApplication
public class CivicProgramApplication {

    public static void main(String[] args) {
        SpringApplication.run(CivicProgramApplication.class, args);
    }
}
