package com.ontario.program.service;

import com.ontario.program.dto.ProgramTypeResponse;
import com.ontario.program.model.ProgramType;
import com.ontario.program.repository.ProgramTypeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProgramTypeServiceTest {

    @Mock
    private ProgramTypeRepository programTypeRepository;

    @InjectMocks
    private ProgramTypeService programTypeService;

    @Test
    void givenProgramTypesExist_whenGetAllProgramTypes_thenReturnAllTypes() {
        // Given
        ProgramType type1 = new ProgramType("Community Services", "Services communautaires");
        type1.setId(1);
        ProgramType type2 = new ProgramType("Health & Wellness", "Santé et bien-être");
        type2.setId(2);
        when(programTypeRepository.findAll()).thenReturn(List.of(type1, type2));

        // When
        List<ProgramTypeResponse> result = programTypeService.getAllProgramTypes();

        // Then
        assertThat(result).hasSize(2);
        assertThat(result.get(0).typeName()).isEqualTo("Community Services");
        assertThat(result.get(0).typeNameFr()).isEqualTo("Services communautaires");
        assertThat(result.get(1).typeName()).isEqualTo("Health & Wellness");
    }

    @Test
    void givenNoProgramTypes_whenGetAllProgramTypes_thenReturnEmptyList() {
        // Given
        when(programTypeRepository.findAll()).thenReturn(List.of());

        // When
        List<ProgramTypeResponse> result = programTypeService.getAllProgramTypes();

        // Then
        assertThat(result).isEmpty();
    }
}
