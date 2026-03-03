package com.ontario.program.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ontario.program.dto.CreateProgramRequest;
import com.ontario.program.dto.PagedResponse;
import com.ontario.program.dto.ProgramResponse;
import com.ontario.program.dto.ReviewProgramRequest;
import com.ontario.program.service.ProgramService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProgramController.class)
class ProgramControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProgramService programService;

    @Test
    void givenProgramsExist_whenGetPrograms_thenReturnOk() throws Exception {
        // Given
        ProgramResponse program = new ProgramResponse(
            1, "Test Program", "Description", 1, "Community Services", 
            "Services communautaires", "SUBMITTED", null, 
            LocalDateTime.now(), null, LocalDateTime.now(), null, "user@example.com"
        );
        PagedResponse<ProgramResponse> response = new PagedResponse<>(
            List.of(program), 1, 1, 0, 20
        );
        when(programService.getPrograms(null, null, 0, 20)).thenReturn(response);

        // When/Then
        mockMvc.perform(get("/api/programs"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.content").isArray())
            .andExpect(jsonPath("$.content[0].programName").value("Test Program"))
            .andExpect(jsonPath("$.totalElements").value(1));
    }

    @Test
    void givenProgramExists_whenGetProgramById_thenReturnOk() throws Exception {
        // Given
        ProgramResponse program = new ProgramResponse(
            1, "Test Program", "Description", 1, "Community Services",
            "Services communautaires", "SUBMITTED", null,
            LocalDateTime.now(), null, LocalDateTime.now(), null, "user@example.com"
        );
        when(programService.getProgramById(1)).thenReturn(Optional.of(program));

        // When/Then
        mockMvc.perform(get("/api/programs/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.programName").value("Test Program"));
    }

    @Test
    void givenProgramNotExists_whenGetProgramById_thenReturnNotFound() throws Exception {
        // Given
        when(programService.getProgramById(999)).thenReturn(Optional.empty());

        // When/Then
        mockMvc.perform(get("/api/programs/999"))
            .andExpect(status().isNotFound());
    }

    @Test
    void givenValidRequest_whenCreateProgram_thenReturnCreated() throws Exception {
        // Given
        CreateProgramRequest request = new CreateProgramRequest(
            "New Program", "Description", 1, "user@example.com"
        );
        ProgramResponse response = new ProgramResponse(
            1, "New Program", "Description", 1, "Community Services",
            "Services communautaires", "SUBMITTED", null,
            LocalDateTime.now(), null, LocalDateTime.now(), null, "user@example.com"
        );
        when(programService.createProgram(any())).thenReturn(response);

        // When/Then
        mockMvc.perform(post("/api/programs")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.programName").value("New Program"));
    }

    @Test
    void givenInvalidRequest_whenCreateProgram_thenReturnBadRequest() throws Exception {
        // Given - missing required programName
        String invalidRequest = """
            {
                "programDescription": "Description",
                "programTypeId": 1
            }
            """;

        // When/Then
        mockMvc.perform(post("/api/programs")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidRequest))
            .andExpect(status().isBadRequest());
    }

    @Test
    void givenValidReview_whenReviewProgram_thenReturnOk() throws Exception {
        // Given
        ReviewProgramRequest request = new ReviewProgramRequest("APPROVED", "Looks good!");
        ProgramResponse response = new ProgramResponse(
            1, "Test Program", "Description", 1, "Community Services",
            "Services communautaires", "APPROVED", "Looks good!",
            LocalDateTime.now(), LocalDateTime.now(), LocalDateTime.now(), 
            LocalDateTime.now(), "user@example.com"
        );
        when(programService.reviewProgram(eq(1), any())).thenReturn(response);

        // When/Then
        mockMvc.perform(put("/api/programs/1/review")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("APPROVED"))
            .andExpect(jsonPath("$.reviewerComments").value("Looks good!"));
    }
}
