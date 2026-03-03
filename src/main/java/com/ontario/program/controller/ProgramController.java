package com.ontario.program.controller;

import com.ontario.program.dto.CreateProgramRequest;
import com.ontario.program.dto.PagedResponse;
import com.ontario.program.dto.ProgramResponse;
import com.ontario.program.dto.ReviewProgramRequest;
import com.ontario.program.service.ProgramService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for Program operations.
 */
@RestController
@RequestMapping("/api/programs")
public class ProgramController {

    private final ProgramService programService;

    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    /**
     * Get all programs with optional filtering and pagination.
     *
     * @param status Filter by program status (DRAFT, SUBMITTED, APPROVED, REJECTED)
     * @param programTypeId Filter by program type
     * @param page Page number (0-indexed)
     * @param size Number of items per page
     * @return Paginated list of programs
     */
    @GetMapping
    public ResponseEntity<PagedResponse<ProgramResponse>> getPrograms(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer programTypeId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PagedResponse<ProgramResponse> programs = programService.getPrograms(status, programTypeId, page, size);
        return ResponseEntity.ok(programs);
    }

    /**
     * Get a single program by ID.
     *
     * @param id Program ID
     * @return Program details
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProgramResponse> getProgram(@PathVariable Integer id) {
        return programService.getProgramById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Create a new program submission.
     *
     * @param request Program creation request
     * @return Created program
     */
    @PostMapping
    public ResponseEntity<ProgramResponse> createProgram(
            @Valid @RequestBody CreateProgramRequest request) {
        ProgramResponse created = programService.createProgram(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Review (approve or reject) a program.
     *
     * @param id Program ID
     * @param request Review request containing status and comments
     * @return Updated program
     */
    @PutMapping("/{id}/review")
    public ResponseEntity<ProgramResponse> reviewProgram(
            @PathVariable Integer id,
            @Valid @RequestBody ReviewProgramRequest request) {
        ProgramResponse reviewed = programService.reviewProgram(id, request);
        return ResponseEntity.ok(reviewed);
    }

    /**
     * Submit a draft program for review.
     *
     * @param id Program ID
     * @return Updated program
     */
    @PutMapping("/{id}/submit")
    public ResponseEntity<ProgramResponse> submitProgram(@PathVariable Integer id) {
        ProgramResponse submitted = programService.submitProgram(id);
        return ResponseEntity.ok(submitted);
    }
}
