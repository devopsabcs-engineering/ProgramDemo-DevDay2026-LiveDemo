package com.ontario.program.dto;

/**
 * Response DTO for program type data.
 */
public record ProgramTypeResponse(
    Integer id,
    String typeName,
    String typeNameFr
) {}
