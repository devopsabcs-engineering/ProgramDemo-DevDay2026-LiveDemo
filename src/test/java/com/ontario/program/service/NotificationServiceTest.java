package com.ontario.program.service;

import com.ontario.program.model.Notification;
import com.ontario.program.model.Program;
import com.ontario.program.model.ProgramType;
import com.ontario.program.repository.NotificationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    @Mock
    private NotificationRepository notificationRepository;

    @InjectMocks
    private NotificationService notificationService;

    private Program testProgram;

    @BeforeEach
    void setUp() {
        ProgramType programType = new ProgramType("Community Services", "Services communautaires");
        programType.setId(1);

        testProgram = new Program();
        testProgram.setId(42);
        testProgram.setProgramName("Youth Employment Initiative");
        testProgram.setProgramDescription("A program to help youth find employment");
        testProgram.setProgramType(programType);
        testProgram.setStatus("SUBMITTED");
        testProgram.setCreatedAt(LocalDateTime.now());
        testProgram.setCreatedBy("citizen@example.com");
    }

    @Test
    void givenSubmittedProgram_whenCreateSubmissionConfirmation_thenSavesPendingNotification() {
        // Given
        Notification saved = new Notification();
        saved.setId(1);
        saved.setNotificationType("SUBMISSION_CONFIRMATION");
        saved.setRecipientEmail("citizen@example.com");
        saved.setStatus("PENDING");
        when(notificationRepository.save(any(Notification.class))).thenReturn(saved);

        // When
        Notification result = notificationService.createSubmissionConfirmation(testProgram);

        // Then
        ArgumentCaptor<Notification> captor = ArgumentCaptor.forClass(Notification.class);
        verify(notificationRepository).save(captor.capture());
        Notification captured = captor.getValue();
        assertThat(captured.getNotificationType()).isEqualTo("SUBMISSION_CONFIRMATION");
        assertThat(captured.getRecipientEmail()).isEqualTo("citizen@example.com");
        assertThat(captured.getStatus()).isEqualTo("PENDING");
        assertThat(captured.getSubject()).contains("Youth Employment Initiative");
        assertThat(result.getId()).isEqualTo(1);
    }

    @Test
    void givenApprovedProgram_whenCreateReviewNotification_thenSavesApprovalNotification() {
        // Given
        testProgram.setStatus("APPROVED");
        testProgram.setReviewerComments("Well structured proposal.");
        Notification saved = new Notification();
        saved.setId(2);
        saved.setNotificationType("REVIEW_APPROVAL");
        saved.setStatus("PENDING");
        when(notificationRepository.save(any(Notification.class))).thenReturn(saved);

        // When
        Notification result = notificationService.createReviewNotification(testProgram);

        // Then
        ArgumentCaptor<Notification> captor = ArgumentCaptor.forClass(Notification.class);
        verify(notificationRepository).save(captor.capture());
        Notification captured = captor.getValue();
        assertThat(captured.getNotificationType()).isEqualTo("REVIEW_APPROVAL");
        assertThat(captured.getSubject()).contains("Approved");
        assertThat(captured.getBody()).contains("approved");
        assertThat(captured.getBody()).contains("Well structured proposal.");
        assertThat(result.getId()).isEqualTo(2);
    }

    @Test
    void givenRejectedProgram_whenCreateReviewNotification_thenSavesRejectionNotification() {
        // Given
        testProgram.setStatus("REJECTED");
        testProgram.setReviewerComments(null);
        Notification saved = new Notification();
        saved.setId(3);
        saved.setNotificationType("REVIEW_REJECTION");
        saved.setStatus("PENDING");
        when(notificationRepository.save(any(Notification.class))).thenReturn(saved);

        // When
        Notification result = notificationService.createReviewNotification(testProgram);

        // Then
        ArgumentCaptor<Notification> captor = ArgumentCaptor.forClass(Notification.class);
        verify(notificationRepository).save(captor.capture());
        Notification captured = captor.getValue();
        assertThat(captured.getNotificationType()).isEqualTo("REVIEW_REJECTION");
        assertThat(captured.getSubject()).contains("Rejected");
        assertThat(captured.getBody()).contains("rejected");
        assertThat(result.getId()).isEqualTo(3);
    }

    @Test
    void givenExistingNotification_whenMarkAsSent_thenUpdatesStatusToSent() {
        // Given
        Notification pending = new Notification();
        pending.setId(4);
        pending.setStatus("PENDING");
        when(notificationRepository.findById(4)).thenReturn(Optional.of(pending));
        when(notificationRepository.save(any(Notification.class))).thenAnswer(i -> i.getArgument(0));

        // When
        notificationService.markAsSent(4);

        // Then
        ArgumentCaptor<Notification> captor = ArgumentCaptor.forClass(Notification.class);
        verify(notificationRepository).save(captor.capture());
        assertThat(captor.getValue().getStatus()).isEqualTo("SENT");
        assertThat(captor.getValue().getSentAt()).isNotNull();
    }

    @Test
    void givenNonExistingNotification_whenMarkAsSent_thenDoesNothing() {
        // Given
        when(notificationRepository.findById(999)).thenReturn(Optional.empty());

        // When
        notificationService.markAsSent(999);

        // Then
        verify(notificationRepository, never()).save(any());
    }

    @Test
    void givenPendingNotificationsExist_whenGetPendingNotifications_thenReturnList() {
        // Given
        Notification n1 = new Notification();
        n1.setId(1);
        n1.setStatus("PENDING");
        Notification n2 = new Notification();
        n2.setId(2);
        n2.setStatus("PENDING");
        when(notificationRepository.findByStatus("PENDING")).thenReturn(List.of(n1, n2));

        // When
        List<Notification> result = notificationService.getPendingNotifications();

        // Then
        assertThat(result).hasSize(2);
        assertThat(result).allMatch(n -> "PENDING".equals(n.getStatus()));
    }

    @Test
    void givenProgramWithNotifications_whenGetNotificationsByProgramId_thenReturnList() {
        // Given
        Notification n = new Notification();
        n.setId(10);
        n.setNotificationType("SUBMISSION_CONFIRMATION");
        when(notificationRepository.findByProgramId(42)).thenReturn(List.of(n));

        // When
        List<Notification> result = notificationService.getNotificationsByProgramId(42);

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getNotificationType()).isEqualTo("SUBMISSION_CONFIRMATION");
    }
}
