package com.ontario.program.dto;

import java.util.List;

/**
 * Generic paginated response wrapper.
 *
 * @param <T> The type of content in the page
 */
public record PagedResponse<T>(
    List<T> content,
    long totalElements,
    int totalPages,
    int page,
    int size
) {}
