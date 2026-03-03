package com.ontario.program.controller;

import com.ontario.program.dto.ProgramTypeResponse;
import com.ontario.program.service.ProgramTypeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProgramTypeController.class)
class ProgramTypeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProgramTypeService programTypeService;

    @Test
    void givenProgramTypesExist_whenGetAllProgramTypes_thenReturnOk() throws Exception {
        // Given
        List<ProgramTypeResponse> types = List.of(
            new ProgramTypeResponse(1, "Community Services", "Services communautaires"),
            new ProgramTypeResponse(2, "Health & Wellness", "Santé et bien-être")
        );
        when(programTypeService.getAllProgramTypes()).thenReturn(types);

        // When/Then
        mockMvc.perform(get("/api/program-types"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$[0].typeName").value("Community Services"))
            .andExpect(jsonPath("$[0].typeNameFr").value("Services communautaires"))
            .andExpect(jsonPath("$[1].typeName").value("Health & Wellness"))
            .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void givenNoProgramTypes_whenGetAllProgramTypes_thenReturnEmptyList() throws Exception {
        // Given
        when(programTypeService.getAllProgramTypes()).thenReturn(List.of());

        // When/Then
        mockMvc.perform(get("/api/program-types"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$.length()").value(0));
    }
}
