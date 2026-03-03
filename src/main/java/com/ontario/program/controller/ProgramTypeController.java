package com.ontario.program.controller;

import com.ontario.program.dto.ProgramTypeResponse;
import com.ontario.program.service.ProgramTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST controller for ProgramType operations.
 */
@RestController
@RequestMapping("/api/program-types")
public class ProgramTypeController {

    private final ProgramTypeService programTypeService;

    public ProgramTypeController(ProgramTypeService programTypeService) {
        this.programTypeService = programTypeService;
    }

    /**
     * Get all program types.
     * 
     * @return List of all program types
     */
    @GetMapping
    public ResponseEntity<List<ProgramTypeResponse>> getAllProgramTypes() {
        List<ProgramTypeResponse> programTypes = programTypeService.getAllProgramTypes();
        return ResponseEntity.ok(programTypes);
    }
}
