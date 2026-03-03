package com.ontario.program.repository;

import com.ontario.program.model.Program;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository for Program entity operations.
 */
@Repository
public interface ProgramRepository extends JpaRepository<Program, Integer> {

    /**
     * Find programs by status with pagination.
     */
    Page<Program> findByStatus(String status, Pageable pageable);

    /**
     * Find programs by program type ID with pagination.
     */
    Page<Program> findByProgramTypeId(Integer programTypeId, Pageable pageable);

    /**
     * Find programs by status and program type ID with pagination.
     */
    Page<Program> findByStatusAndProgramTypeId(String status, Integer programTypeId, Pageable pageable);

    /**
     * Search programs by name (case-insensitive).
     */
    @Query("SELECT p FROM Program p WHERE LOWER(p.programName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Program> searchByName(@Param("searchTerm") String searchTerm, Pageable pageable);
}
