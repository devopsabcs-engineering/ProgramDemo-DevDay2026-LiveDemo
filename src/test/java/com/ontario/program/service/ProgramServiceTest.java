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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProgramServiceTest {

    @Mock
    private ProgramRepository programRepository;

    @Mock
    private ProgramTypeRepository programTypeRepository;

    @InjectMocks
    private ProgramService programService;

    private ProgramType testProgramType;
    private Program testProgram;

    @BeforeEach
    void setUp() {
        testProgramType = new ProgramType("Community Services", "Services communautaires");
        testProgramType.setId(1);

        testProgram = new Program();
        testProgram.setId(1);
        testProgram.setProgramName("Youth Employment Initiative");
        testProgram.setProgramDescription("A program to help youth find employment");
        testProgram.setProgramType(testProgramType);
        testProgram.setStatus("SUBMITTED");
        testProgram.setCreatedAt(LocalDateTime.now());
        testProgram.setCreatedBy("citizen@example.com");
    }

    @Test
    void givenProgramsExist_whenGetPrograms_thenReturnPagedResponse() {
        // Given
        Page<Program> programPage = new PageImpl<>(List.of(testProgram));
        when(programRepository.findAll(any(Pageable.class))).thenReturn(programPage);

        // When
        PagedResponse<ProgramResponse> result = programService.getPrograms(null, null, 0, 20);

        // Then
        assertThat(result.content()).hasSize(1);
        assertThat(result.content().get(0).programName()).isEqualTo("Youth Employment Initiative");
        assertThat(result.totalElements()).isEqualTo(1);
    }

    @Test
    void givenProgramExists_whenGetProgramById_thenReturnProgram() {
        // Given
        when(programRepository.findById(1)).thenReturn(Optional.of(testProgram));

        // When
        Optional<ProgramResponse> result = programService.getProgramById(1);

        // Then
        assertThat(result).isPresent();
        assertThat(result.get().programName()).isEqualTo("Youth Employment Initiative");
        assertThat(result.get().programTypeName()).isEqualTo("Community Services");
    }

    @Test
    void givenProgramNotExists_whenGetProgramById_thenReturnEmpty() {
        // Given
        when(programRepository.findById(999)).thenReturn(Optional.empty());

        // When
        Optional<ProgramResponse> result = programService.getProgramById(999);

        // Then
        assertThat(result).isEmpty();
    }

    @Test
    void givenValidRequest_whenCreateProgram_thenReturnCreatedProgram() {
        // Given
        CreateProgramRequest request = new CreateProgramRequest(
            "New Program", "Description", 1, "user@example.com"
        );
        when(programTypeRepository.findById(1)).thenReturn(Optional.of(testProgramType));
        when(programRepository.save(any(Program.class))).thenAnswer(invocation -> {
            Program saved = invocation.getArgument(0);
            saved.setId(2);
            return saved;
        });

        // When
        ProgramResponse result = programService.createProgram(request);

        // Then
        assertThat(result.id()).isEqualTo(2);
        assertThat(result.programName()).isEqualTo("New Program");
        assertThat(result.status()).isEqualTo("SUBMITTED");
    }

    @Test
    void givenInvalidProgramType_whenCreateProgram_thenThrowException() {
        // Given
        CreateProgramRequest request = new CreateProgramRequest(
            "New Program", "Description", 999, "user@example.com"
        );
        when(programTypeRepository.findById(999)).thenReturn(Optional.empty());

        // When/Then
        assertThatThrownBy(() -> programService.createProgram(request))
            .isInstanceOf(ResourceNotFoundException.class)
            .hasMessageContaining("Program type not found");
    }

    @Test
    void givenSubmittedProgram_whenReviewApprove_thenReturnApprovedProgram() {
        // Given
        testProgram.setStatus("SUBMITTED");
        ReviewProgramRequest request = new ReviewProgramRequest("APPROVED", "Looks good!");
        when(programRepository.findById(1)).thenReturn(Optional.of(testProgram));
        when(programRepository.save(any(Program.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // When
        ProgramResponse result = programService.reviewProgram(1, request);

        // Then
        assertThat(result.status()).isEqualTo("APPROVED");
        assertThat(result.reviewerComments()).isEqualTo("Looks good!");
    }

    @Test
    void givenDraftProgram_whenReview_thenThrowException() {
        // Given
        testProgram.setStatus("DRAFT");
        ReviewProgramRequest request = new ReviewProgramRequest("APPROVED", "Comments");
        when(programRepository.findById(1)).thenReturn(Optional.of(testProgram));

        // When/Then
        assertThatThrownBy(() -> programService.reviewProgram(1, request))
            .isInstanceOf(IllegalStateException.class)
            .hasMessageContaining("Only SUBMITTED programs can be reviewed");
    }
}
