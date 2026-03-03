package com.ontario.program.service;

import com.ontario.program.config.ResourceNotFoundException;
import com.ontario.program.dto.CreateProgramRequest;
import com.ontario.program.dto.PagedResponse;
import com.ontario.program.dto.ProgramResponse;
import com.ontario.program.dto.ReviewProgramRequest;
import com.ontario.program.model.Program;
import com.ontario.program.model.ProgramType;
import com.ontario.program.repository.ProgramRepository;
import com.ontario.program.repository.ProgramTypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Service for Program operations.
 */
@Service
public class ProgramService {

    private final ProgramRepository programRepository;
    private final ProgramTypeRepository programTypeRepository;

    public ProgramService(ProgramRepository programRepository,
                          ProgramTypeRepository programTypeRepository) {
        this.programRepository = programRepository;
        this.programTypeRepository = programTypeRepository;
    }

    /**
     * Get all programs with optional filtering and pagination.
     */
    @Transactional(readOnly = true)
    public PagedResponse<ProgramResponse> getPrograms(String status, Integer programTypeId, 
                                                       int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Program> programPage;

        if (status != null && programTypeId != null) {
            programPage = programRepository.findByStatusAndProgramTypeId(status, programTypeId, pageable);
        } else if (status != null) {
            programPage = programRepository.findByStatus(status, pageable);
        } else if (programTypeId != null) {
            programPage = programRepository.findByProgramTypeId(programTypeId, pageable);
        } else {
            programPage = programRepository.findAll(pageable);
        }

        return new PagedResponse<>(
            programPage.getContent().stream().map(this::toResponse).toList(),
            programPage.getTotalElements(),
            programPage.getTotalPages(),
            programPage.getNumber(),
            programPage.getSize()
        );
    }

    /**
     * Get a program by ID.
     */
    @Transactional(readOnly = true)
    public Optional<ProgramResponse> getProgramById(Integer id) {
        return programRepository.findById(id).map(this::toResponse);
    }

    /**
     * Create a new program submission.
     */
    @Transactional
    public ProgramResponse createProgram(CreateProgramRequest request) {
        ProgramType programType = programTypeRepository.findById(request.programTypeId())
            .orElseThrow(() -> new ResourceNotFoundException(
                "Program type not found with ID: " + request.programTypeId()));

        Program program = new Program();
        program.setProgramName(request.programName());
        program.setProgramDescription(request.programDescription());
        program.setProgramType(programType);
        program.setStatus("SUBMITTED");
        program.setSubmittedAt(LocalDateTime.now());
        program.setCreatedBy(request.createdBy());

        Program saved = programRepository.save(program);
        return toResponse(saved);
    }

    /**
     * Review (approve/reject) a program.
     */
    @Transactional
    public ProgramResponse reviewProgram(Integer id, ReviewProgramRequest request) {
        Program program = programRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Program not found with ID: " + id));

        if (!"SUBMITTED".equals(program.getStatus())) {
            throw new IllegalStateException("Only SUBMITTED programs can be reviewed. Current status: " 
                + program.getStatus());
        }

        program.setStatus(request.status());
        program.setReviewerComments(request.reviewerComments());
        program.setReviewedAt(LocalDateTime.now());

        Program updated = programRepository.save(program);
        return toResponse(updated);
    }

    /**
     * Submit a draft program for review.
     */
    @Transactional
    public ProgramResponse submitProgram(Integer id) {
        Program program = programRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Program not found with ID: " + id));

        if (!"DRAFT".equals(program.getStatus())) {
            throw new IllegalStateException("Only DRAFT programs can be submitted. Current status: " 
                + program.getStatus());
        }

        program.setStatus("SUBMITTED");
        program.setSubmittedAt(LocalDateTime.now());

        Program updated = programRepository.save(program);
        return toResponse(updated);
    }

    private ProgramResponse toResponse(Program program) {
        ProgramType type = program.getProgramType();
        return new ProgramResponse(
            program.getId(),
            program.getProgramName(),
            program.getProgramDescription(),
            type != null ? type.getId().intValue() : null,
            type != null ? type.getTypeName() : null,
            type != null ? type.getTypeNameFr() : null,
            program.getStatus(),
            program.getReviewerComments(),
            program.getSubmittedAt(),
            program.getReviewedAt(),
            program.getCreatedAt(),
            program.getUpdatedAt(),
            program.getCreatedBy()
        );
    }
}
