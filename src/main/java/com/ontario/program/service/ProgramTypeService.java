package com.ontario.program.service;

import com.ontario.program.dto.ProgramTypeResponse;
import com.ontario.program.model.ProgramType;
import com.ontario.program.repository.ProgramTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service for ProgramType operations.
 */
@Service
public class ProgramTypeService {

    private final ProgramTypeRepository programTypeRepository;

    public ProgramTypeService(ProgramTypeRepository programTypeRepository) {
        this.programTypeRepository = programTypeRepository;
    }

    /**
     * Get all program types.
     */
    @Transactional(readOnly = true)
    public List<ProgramTypeResponse> getAllProgramTypes() {
        return programTypeRepository.findAll()
            .stream()
            .map(this::toResponse)
            .toList();
    }

    /**
     * Get a program type by ID.
     */
    @Transactional(readOnly = true)
    public Optional<ProgramType> getProgramTypeById(Integer id) {
        return programTypeRepository.findById(id);
    }

    private ProgramTypeResponse toResponse(ProgramType programType) {
        return new ProgramTypeResponse(
            programType.getId(),
            programType.getTypeName(),
            programType.getTypeNameFr()
        );
    }
}
