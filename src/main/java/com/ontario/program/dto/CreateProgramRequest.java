package com.ontario.program.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Request DTO for creating a new program submission.
 */
public record CreateProgramRequest(
    @NotBlank(message = "Program name is required")
    @Size(max = 200, message = "Program name must not exceed 200 characters")
    String programName,

    String programDescription,

    @NotNull(message = "Program type is required")
    Integer programTypeId,

    String createdBy
) {}
