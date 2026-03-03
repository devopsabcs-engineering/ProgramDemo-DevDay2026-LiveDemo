package com.ontario.program.repository;

import com.ontario.program.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Notification entity operations.
 */
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    /**
     * Find notifications by program ID.
     */
    List<Notification> findByProgramId(Integer programId);

    /**
     * Find notifications by status.
     */
    List<Notification> findByStatus(String status);
}
