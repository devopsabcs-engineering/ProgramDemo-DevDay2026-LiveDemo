package com.ontario.program.service;

import com.ontario.program.model.Notification;
import com.ontario.program.model.Program;
import com.ontario.program.repository.NotificationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service for Notification operations.
 * Handles creation and sending of email notifications.
 */
@Service
public class NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    /**
     * Create a submission confirmation notification.
     */
    @Transactional
    public Notification createSubmissionConfirmation(Program program) {
        Notification notification = new Notification();
        notification.setProgram(program);
        notification.setNotificationType("SUBMISSION_CONFIRMATION");
        notification.setRecipientEmail(program.getCreatedBy());
        notification.setSubject("Program Submission Confirmation - " + program.getProgramName());
        notification.setBody(buildSubmissionConfirmationBody(program));
        notification.setStatus("PENDING");

        Notification saved = notificationRepository.save(notification);
        log.info("Created submission confirmation notification for program ID: {}", program.getId());
        return saved;
    }

    /**
     * Create a review notification (approval or rejection).
     */
    @Transactional
    public Notification createReviewNotification(Program program) {
        String notificationType = "APPROVED".equals(program.getStatus()) 
            ? "REVIEW_APPROVAL" 
            : "REVIEW_REJECTION";

        Notification notification = new Notification();
        notification.setProgram(program);
        notification.setNotificationType(notificationType);
        notification.setRecipientEmail(program.getCreatedBy());
        notification.setSubject(buildReviewSubject(program));
        notification.setBody(buildReviewBody(program));
        notification.setStatus("PENDING");

        Notification saved = notificationRepository.save(notification);
        log.info("Created {} notification for program ID: {}", notificationType, program.getId());
        return saved;
    }

    /**
     * Mark a notification as sent.
     */
    @Transactional
    public void markAsSent(Integer notificationId) {
        notificationRepository.findById(notificationId).ifPresent(notification -> {
            notification.setStatus("SENT");
            notification.setSentAt(LocalDateTime.now());
            notificationRepository.save(notification);
            log.info("Marked notification {} as SENT", notificationId);
        });
    }

    /**
     * Get all pending notifications.
     */
    @Transactional(readOnly = true)
    public List<Notification> getPendingNotifications() {
        return notificationRepository.findByStatus("PENDING");
    }

    /**
     * Get notifications for a specific program.
     */
    @Transactional(readOnly = true)
    public List<Notification> getNotificationsByProgramId(Integer programId) {
        return notificationRepository.findByProgramId(programId);
    }

    private String buildSubmissionConfirmationBody(Program program) {
        return String.format("""
            Dear Applicant,
            
            Thank you for submitting your program request.
            
            Program Name: %s
            Submission ID: %d
            Status: Submitted for Review
            
            You will receive another notification once your submission has been reviewed.
            
            Thank you,
            CIVIC Program Management Team
            """, program.getProgramName(), program.getId());
    }

    private String buildReviewSubject(Program program) {
        String action = "APPROVED".equals(program.getStatus()) ? "Approved" : "Rejected";
        return String.format("Program %s - %s", action, program.getProgramName());
    }

    private String buildReviewBody(Program program) {
        String action = "APPROVED".equals(program.getStatus()) ? "approved" : "rejected";
        String commentsSection = program.getReviewerComments() != null 
            ? "\nReviewer Comments: " + program.getReviewerComments() + "\n"
            : "";

        return String.format("""
            Dear Applicant,
            
            Your program request has been %s.
            
            Program Name: %s
            Submission ID: %d
            Status: %s
            %s
            Thank you,
            CIVIC Program Management Team
            """, action, program.getProgramName(), program.getId(), 
            program.getStatus(), commentsSection);
    }
}
